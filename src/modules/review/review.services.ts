import { StatusCodes } from "http-status-codes";
import { isValidObjectId, startSession } from "mongoose";
import { AuthPayload } from "../../types/AuthPayload";
import throwApiError from "../../utils/throwApiError";
import Book from "../book/book.model";
import User from "../user/user.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

export const createReviewService = async (
  review: TReview,
  payload: AuthPayload | null,
  bookId: string,
) => {
  const { _id, email } = payload || {};

  if (!isValidObjectId(bookId)) {
    throwApiError(StatusCodes.NOT_FOUND, "Book not found");
  }

  if (_id?.toString() !== (review.reviewer as unknown as string)) {
    throwApiError(
      StatusCodes.FORBIDDEN,
      "Forbidden Access. You can not review with another user's account",
    );
  }

  const session = await startSession();

  try {
    session.startTransaction();

    const book = await Book.findOne({ _id: bookId })
      .populate({
        path: "reviews",
      })
      .session(session);

    if (!book) {
      throwApiError(StatusCodes.NOT_FOUND, "Book not found");
    }

    if (book.email === email) {
      throwApiError(
        StatusCodes.BAD_REQUEST,
        "You can not review your own book",
      );
    }

    const reviewers = await Review.find({ bookId: book._id })
      .populate("reviewer")
      .select("reviewer")
      .distinct("reviewer")
      .transform((v) => v.toString())
      .lean()
      .session(session);

    if (reviewers.includes(_id as unknown as string)) {
      throwApiError(
        StatusCodes.CONFLICT,
        "You have already reviewed this book",
      );
    }

    if (reviewers.includes(review.reviewer as unknown as string)) {
      throwApiError(
        StatusCodes.FORBIDDEN,
        "Forbidden Access. You can not review with another user's account",
      );
    }

    const user = await User.findOne({ _id, email }).session(session);

    if (!user) {
      throwApiError(StatusCodes.BAD_REQUEST, "Reviewer account not found");
    }

    const createdReview = await Review.create([review], { session });

    if (Object.keys(createdReview[0]).length === 0) {
      throwApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to post the review",
      );
    }

    await Book.findOneAndUpdate(
      { _id: bookId },
      { $push: { reviews: createdReview[0]._id } },
    ).session(session);

    await session.commitTransaction();
    await session.endSession();
    return createdReview[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

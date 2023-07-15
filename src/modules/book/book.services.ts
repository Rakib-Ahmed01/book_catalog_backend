import { StatusCodes } from "http-status-codes";
import { AuthPayload } from "../../types";
import throwApiError from "../../utils/throwApiError";
import User from "../user/user.model";
import { TBook } from "./book.interface";
import Book from "./book.model";

export const createBookService = async (
  book: TBook,
  payload: AuthPayload | null,
) => {
  const { _id, email } = payload || {};
  const user = await User.findOne({ _id, email });

  if (!user) {
    throwApiError(StatusCodes.BAD_REQUEST, "Author email not found");
  }

  if (book.email !== user.email) {
    throwApiError(
      StatusCodes.FORBIDDEN,
      "Forbidden Access. You are using another user's email",
    );
  }

  const createdBook = await Book.create(book);
  return createdBook;
};

import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { TReview } from "./review.interface";
import { createReviewService } from "./review.services";

export const createReview = expressAsyncHandler(async (req, res) => {
  // Extract book id from params
  const { id } = req.params;
  const payload = req.payload;
  const review = await createReviewService(req.body, payload, id);

  sendResponse<TReview>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Review created successfully",
    data: review,
  });
});

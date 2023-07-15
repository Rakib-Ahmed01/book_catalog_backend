import { Schema, model } from "mongoose";
import { ReviewModel, TReview } from "./review.interface";

const reviewSchema = new Schema<TReview, ReviewModel>({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "{PATH} is required"],
  },
  reviewText: {
    type: String,
    required: [true, "{PATH} is required"],
  },
  rating: {
    type: Number,
    required: [true, "{PATH} is required"],
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "{PATH} is required"],
  },
});

export const Review = model<TReview, ReviewModel>("Review", reviewSchema);

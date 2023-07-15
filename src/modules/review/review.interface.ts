import { Model, ObjectId } from "mongoose";

export type TReview = {
  bookId: ObjectId;
  reviewText: string;
  rating: number;
  reviewer: ObjectId;
};

export type ReviewModel = Model<TReview>;

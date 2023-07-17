import { Model, ObjectId } from "mongoose";

export type TWishList = {
  bookId: ObjectId;
  userId: ObjectId;
};

export type WishListModel = Model<TWishList>;

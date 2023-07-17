import { Model, ObjectId } from "mongoose";

export type TWishList = {
  bookId: ObjectId;
  email: string;
};

export type WishListModel = Model<TWishList>;

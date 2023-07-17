import { Schema, model } from "mongoose";
import { TWishList, WishListModel } from "./wishlist.interface";

const wishListSchema = new Schema<TWishList, WishListModel>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "{PATH} is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "{PATH} is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const WishList = model<TWishList, WishListModel>(
  "WishList",
  wishListSchema,
);

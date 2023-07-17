import { Schema, model } from "mongoose";
import { validateEmail } from "../../utils/validateEmail";
import { TWishList, WishListModel } from "./wishlist.interface";

const wishListSchema = new Schema<TWishList, WishListModel>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "{PATH} is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: validateEmail,
        message: "Please provide a valid email",
      },
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

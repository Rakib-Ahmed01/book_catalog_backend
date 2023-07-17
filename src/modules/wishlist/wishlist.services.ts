import { StatusCodes } from "http-status-codes";
import { isValidObjectId } from "mongoose";
import { AuthPayload } from "../../types/AuthPayload";
import throwApiError from "../../utils/throwApiError";
import { TWishList } from "./wishlist.interface";
import { WishList } from "./wishlist.model";

export const createWishListService = async (wishList: TWishList) => {
  const createdWishList = await WishList.create(wishList);
  return createdWishList;
};

export const getAllWishListsService = async (email: string) => {
  const wishlists = await WishList.find({ email })
    .select("bookId")
    .distinct("bookId")
    .lean();
  return wishlists;
};

export const deleteWishListService = async (
  id: string,
  authPayload: AuthPayload,
) => {
  const { email } = authPayload;

  if (!isValidObjectId(id)) {
    throwApiError(StatusCodes.BAD_REQUEST, "Invalid wishlist id");
  }

  const wishlist = await WishList.findOne({ _id: id });

  if (!wishlist) {
    throwApiError(StatusCodes.NOT_FOUND, "WishList not found");
  } else if (wishlist.email !== email) {
    throwApiError(
      StatusCodes.FORBIDDEN,
      "Forbidden Access. You can not delete another user's wishlist",
    );
  }

  const result = await WishList.deleteOne({ _id: id });

  return result;
};

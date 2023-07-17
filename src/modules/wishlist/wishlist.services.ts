import { TWishList } from "./wishlist.interface";
import { WishList } from "./wishlist.model";

export const createWishListService = async (wishList: TWishList) => {
  const createdWishList = await WishList.create(wishList);
  return createdWishList;
};

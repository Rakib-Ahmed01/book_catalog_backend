import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { TWishList } from "./wishlist.interface";
import { createWishListService } from "./wishlist.services";

export const createWishList = expressAsyncHandler(async (req, res) => {
  const wishList = await createWishListService(req.body);

  sendResponse<TWishList>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "WishList created successfully",
    data: wishList,
  });
});

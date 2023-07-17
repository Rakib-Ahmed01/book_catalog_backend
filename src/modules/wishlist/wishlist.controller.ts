import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { TWishList } from "./wishlist.interface";
import {
  createWishListService,
  deleteWishListService,
  getAllWishListsService,
} from "./wishlist.services";

export const createWishList = expressAsyncHandler(async (req, res) => {
  const wishList = await createWishListService(req.body);

  sendResponse<TWishList>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "WishList created successfully",
    data: wishList,
  });
});

export const getAllWishLists = expressAsyncHandler(async (req, res) => {
  const { email } = req.query;
  const wishLists = await getAllWishListsService(email as string);

  sendResponse<TWishList>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "WishLists retrieved successfully",
    data: wishLists,
  });
});

export const deleteWishList = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteWishListService(id, req.payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "WishList deleted successfully",
    data: result,
  });
});

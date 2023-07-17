import express from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../utils/validateRequest";
import { createWishList, getAllWishLists } from "./wishlist.controller";
import { createWishListZodSchema } from "./wishlist.validation";

export const wishListRouter = express.Router();

wishListRouter
  .route("/")
  .get(auth(), getAllWishLists)
  .post(auth(), validateRequest(createWishListZodSchema), createWishList);

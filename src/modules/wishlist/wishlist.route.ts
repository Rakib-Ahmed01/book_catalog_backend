import express from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../utils/validateRequest";
import { createWishList } from "./wishlist.controller";
import { createWishListZodSchema } from "./wishlist.validation";

export const wishListRouter = express.Router();

wishListRouter
  .route("/")
  .post(auth(), validateRequest(createWishListZodSchema), createWishList);

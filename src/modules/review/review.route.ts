import express from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../utils/validateRequest";
import { createReview } from "./review.controller";
import { createReviewZodSchema } from "./review.validation";

export const reviewRouter = express.Router();

reviewRouter
  .route("/:id")
  .post(auth(), validateRequest(createReviewZodSchema), createReview);

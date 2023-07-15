import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const createReviewZodSchema = z.object({
  body: z.object({
    bookId: z
      .string({
        required_error: "Book Id is required",
        invalid_type_error: "Book Id must be a string",
      })
      .refine((id) => {
        return isValidObjectId(id);
      }, "Invalid book id"),
    reviewText: z.string({
      required_error: "Review Text is required",
      invalid_type_error: "Review Text must be a string",
    }),
    rating: z.number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    }),
    reviewer: z
      .string({
        required_error: "Reviewer Id is required",
        invalid_type_error: "Reviewer Id must be a string",
      })
      .refine((id) => {
        return isValidObjectId(id);
      }, "Invalid reviewer id"),
  }),
});

export const updateReviewZodSchema = createReviewZodSchema
  .deepPartial()
  .refine((updateData) => {
    return Object.keys(updateData.body || {}).length > 0;
  }, "Missing update data");

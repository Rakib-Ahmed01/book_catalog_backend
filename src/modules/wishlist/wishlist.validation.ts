import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const createWishListZodSchema = z.object({
  body: z.object({
    bookId: z
      .string({
        required_error: "Book Id is required",
        invalid_type_error: "Book Id must be a string",
      })
      .refine((id) => {
        return isValidObjectId(id);
      }, "Invalid book id"),
    userId: z
      .string({
        required_error: "User Id is required",
        invalid_type_error: "User Id must be a string",
      })
      .refine((id) => {
        return isValidObjectId(id);
      }, "Invalid user id"),
  }),
});

export const updateWishListZodSchema = createWishListZodSchema
  .deepPartial()
  .refine((updateData) => {
    return Object.keys(updateData?.body || {}).length > 0;
  }, "Missing update data");

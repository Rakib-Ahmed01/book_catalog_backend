import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { validateEmail } from "../../utils/validateEmail";

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
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .refine(validateEmail, "Please provide a valid email"),
  }),
});

export const updateWishListZodSchema = createWishListZodSchema
  .deepPartial()
  .refine((updateData) => {
    return Object.keys(updateData?.body || {}).length > 0;
  }, "Missing update data");

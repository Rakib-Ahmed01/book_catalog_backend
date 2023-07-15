import { z } from "zod";
import { validateEmail } from "../../utils/validateEmail";

export const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }),
    author: z.string({
      required_error: "Author is required",
      invalid_type_error: "Author must be a string",
    }),
    genre: z.string({
      required_error: "Genre is required",
      invalid_type_error: "Genre must be a string",
    }),
    publicationDate: z.string({
      required_error: "Publication date is required",
      invalid_type_error: "Publication date must be a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .refine(validateEmail, "Please provide a valid email"),
  }),
});

export const updateBookZodSchema = createBookZodSchema.deepPartial();

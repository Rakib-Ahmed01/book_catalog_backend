import { z } from "zod";
import { validateEmail } from "../../utils/validateEmail";

export const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
      })
      .min(6, "Password must be at least 6 characters long"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be string",
      })
      .refine(validateEmail, "Please provide a valid email"),
  }),
});

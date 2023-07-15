import { z } from "zod";
import { validateEmail } from "../../utils/validateEmail";

export const registerUserZodSchema = z.object({
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

export const loginUserZodSchema = z.object({
  body: z.object({
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
      .refine(validateEmail, "Invalid email"),
  }),
});

export const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
      invalid_type_error: "Refresh Token must be a string",
    }),
  }),
});

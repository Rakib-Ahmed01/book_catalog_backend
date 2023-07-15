import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { loginUser, refreshToken, registerUser } from "./auth.controller";
import {
  loginUserZodSchema,
  refreshTokenZodSchema,
  registerUserZodSchema,
} from "./auth.validation";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  validateRequest(registerUserZodSchema),
  registerUser,
);

authRouter.post("/login", validateRequest(loginUserZodSchema), loginUser);

authRouter.get(
  "/refresh-token",
  validateRequest(refreshTokenZodSchema),
  refreshToken,
);

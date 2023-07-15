import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { loginUser, registerUser } from "./auth.controller";
import { loginUserZodSchema, registerUserZodSchema } from "./auth.validation";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  validateRequest(registerUserZodSchema),
  registerUser,
);

authRouter.post("/login", validateRequest(loginUserZodSchema), loginUser);

authRouter.get("/refresh-token");

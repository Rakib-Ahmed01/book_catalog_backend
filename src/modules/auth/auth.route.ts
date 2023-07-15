import express from "express";
import { registerUser } from "./auth.controller";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login");

authRouter.get("/refresh-token");

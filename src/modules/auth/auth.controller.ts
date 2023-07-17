import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { LoginResponse } from "../../types/LoginResponse";
import { sendResponse } from "../../utils/sendResponse";
import { TUser } from "../user/user.interface";
import {
  loginUserService,
  refreshTokenService,
  registerUserService,
} from "./auth.services";

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await registerUserService(req.body);

    sendResponse<Omit<TUser, "password">>(res, {
      statusCode: StatusCodes.OK,
      message: "User created successfully",
      success: true,
      data: user,
    });
  },
);

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { accessToken, refreshToken, user } = await loginUserService(req.body);

  res.cookie("refreshToken", refreshToken, {
    secure: process.env.ENV === "production",
    httpOnly: true,
  });

  sendResponse<LoginResponse>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User logged in successfully",
    data: { accessToken, user },
  });
});

export const refreshToken = expressAsyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const { accessToken, user } = await refreshTokenService(refreshToken);

  res.cookie("refreshToken", refreshToken, {
    secure: process.env.ENV === "production",
    httpOnly: true,
  });

  sendResponse<LoginResponse>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "New access token generated successfully!",
    data: { accessToken, user },
  });
});

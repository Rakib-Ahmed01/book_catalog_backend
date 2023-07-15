import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { TUser } from "../user/user.interface";
import { registerUserService } from "./auth.services";

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

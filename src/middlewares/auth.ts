import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import env from "../config";
import User from "../modules/user/user.model";
import throwApiError from "../utils/throwApiError";

export const auth = () =>
  expressAsyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throwApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
      }

      const token = authHeader?.split(" ")[1];

      if (!token || typeof token !== "string") {
        throwApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
      }

      let decoded = {} as { email: string; _id: Schema.Types.ObjectId };

      decoded = jwt.verify(token as string, env.accessTokenSecret) as {
        email: string;
        _id: Schema.Types.ObjectId;
      };

      const { _id, email } = decoded;

      const user = await User.findOne({ _id, email });

      if (!user) {
        throwApiError(StatusCodes.FORBIDDEN, "Forbidden Access");
      }

      req.payload = decoded;

      return next();
    },
  );

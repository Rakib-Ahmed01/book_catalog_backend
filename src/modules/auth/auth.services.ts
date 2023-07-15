import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import env from "../../config";
import { generateJwtTokens } from "../../utils/generateJwtTokens";
import throwApiError from "../../utils/throwApiError";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";

export const registerUserService = async (user: TUser) => {
  const isExist = await User.findOne({ email: user.email });

  if (isExist) {
    throwApiError(StatusCodes.CONFLICT, "User already exists with the email");
  }

  const createdUser = await User.create(user);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...withoutPassword } = createdUser.toObject();
  return withoutPassword;
};

export const loginUserService = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  const user = await User.findOne({ email }).select("password email").lean();

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, `User not found`);
  }

  const doesPasswordMatched = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatched) {
    throwApiError(StatusCodes.BAD_REQUEST, "Incorrect password");
  }

  const { accessToken, refreshToken } = generateJwtTokens({
    email: user?.email,
    _id: user?._id,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (refreshToken: string) => {
  let decodedData = {} as { email: string; _id: Schema.Types.ObjectId };

  try {
    decodedData = jwt.verify(refreshToken, env.refreshTokenSecret) as {
      email: string;
      _id: Schema.Types.ObjectId;
    };
  } catch (error) {
    throwApiError(StatusCodes.FORBIDDEN, "Invalid token");
  }

  const { _id, email } = decodedData;

  const user = await User.findOne({ _id, email });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, `User not found`);
  }

  const { accessToken } = generateJwtTokens({ email, _id });

  return accessToken;
};

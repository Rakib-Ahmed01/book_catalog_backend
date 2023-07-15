import { StatusCodes } from "http-status-codes";
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

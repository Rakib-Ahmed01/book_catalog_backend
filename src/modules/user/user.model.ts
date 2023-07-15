import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { Schema, model } from "mongoose";
import throwApiError from "../../utils/throwApiError";
import { validateEmail } from "../../utils/validateEmail";
import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "{PATH} is required"],
    },
    email: {
      type: String,
      required: [true, "{PATH} is required"],
      unique: true,
      validate: {
        validator: validateEmail,
        message: () => `Please provide a valid email`,
      },
    },
    password: {
      type: String,
      required: [true, "{PATH} is required"],
      min: [6, "Password must be at least 6 characters long"],
      select: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre("save", async function (next) {
  if (this.password.length < 6) {
    throwApiError(
      StatusCodes.BAD_REQUEST,
      "Password must be at least 6 characters long",
    );
  }

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

const User = model<TUser, UserModel>("User", userSchema);

export default User;

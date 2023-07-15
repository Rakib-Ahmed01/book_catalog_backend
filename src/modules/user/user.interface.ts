import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type UserModel = Model<TUser>;

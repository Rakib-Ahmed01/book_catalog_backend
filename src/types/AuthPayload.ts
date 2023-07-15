import { ObjectId } from "mongoose";

export type AuthPayload = {
  email: string;
  _id: ObjectId;
};

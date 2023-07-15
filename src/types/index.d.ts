import { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";

interface AuthPayload extends JwtPayload {
  email: string;
  _id: Schema.Types.ObjectId;
}

declare global {
  namespace Express {
    interface Request {
      payload: AuthPayload;
    }
  }
}

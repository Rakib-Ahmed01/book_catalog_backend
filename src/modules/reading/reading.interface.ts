import { Model, ObjectId } from "mongoose";

export type TReading = {
  bookId: ObjectId;
  email: string;
};

export type ReadingModel = Model<TReading>;

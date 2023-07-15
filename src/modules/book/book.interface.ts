import { Model, ObjectId } from "mongoose";

export type TBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  email: string;
  reviews: ObjectId[];
};

export type BookModel = Model<TBook>;

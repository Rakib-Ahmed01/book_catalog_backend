import { Model } from "mongoose";

export type TBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  email: string;
};

export type BookModel = Model<TBook>;

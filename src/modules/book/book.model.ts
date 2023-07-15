import { Schema, model } from "mongoose";
import { validateEmail } from "../../utils/validateEmail";
import { BookModel, TBook } from "./book.interface";

const bookSchema = new Schema<TBook, BookModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    publicationDate: {
      type: String,
      required: [true, "Publication Date is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: validateEmail,
        message: "Please provide a valid email",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Book = model<TBook, BookModel>("Book", bookSchema);

export default Book;

import { StatusCodes } from "http-status-codes";
import { Schema, model } from "mongoose";
import throwApiError from "../../utils/throwApiError";
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
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

bookSchema.pre("save", async function (next) {
  const isDuplicateTitle = await Book.findOne({ title: this.title });

  if (isDuplicateTitle) {
    throwApiError(StatusCodes.CONFLICT, "Book already exists with the title");
  }

  next();
});

const Book = model<TBook, BookModel>("Book", bookSchema);

export default Book;

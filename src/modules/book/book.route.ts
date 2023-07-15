import express from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../utils/validateRequest";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "./book.controller";
import { createBookZodSchema, updateBookZodSchema } from "./book.validation";

export const bookRouter = express.Router();

bookRouter
  .route("/:id")
  .get(getSingleBook)
  .patch(auth(), validateRequest(updateBookZodSchema), updateBook)
  .delete(auth(), deleteBook);

bookRouter
  .route("/")
  .post(auth(), validateRequest(createBookZodSchema), createBook)
  .get(getAllBooks);

import express from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../utils/validateRequest";
import { createBook, getAllBooks, getSingleBook } from "./book.controller";
import { createBookZodSchema } from "./book.validation";

export const bookRouter = express.Router();

bookRouter.route("/:id").get(getSingleBook);

bookRouter
  .route("/")
  .post(validateRequest(createBookZodSchema), auth(), createBook)
  .get(getAllBooks);

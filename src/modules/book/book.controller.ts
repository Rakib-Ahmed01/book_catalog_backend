import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { TBook } from "./book.interface";
import { createBookService } from "./book.services";

export const createBook = expressAsyncHandler(async (req, res) => {
  const payload = req.payload;
  const book = await createBookService(req.body, payload);

  sendResponse<TBook>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Book created successfully",
    data: book,
  });
});

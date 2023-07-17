import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { FilterOptions } from "../../types/FilterOptions";
import { PaginationOptions } from "../../types/PaginationOptions";
import { QueryObject } from "../../types/QueryObject";
import { pickOptions } from "../../utils/pickOptions";
import { sendResponse } from "../../utils/sendResponse";
import { TBook } from "./book.interface";
import {
  createBookService,
  deleteBookService,
  getAllBooksService,
  getSingleBookService,
  updateBookService,
} from "./book.services";

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

export const getAllBooks = expressAsyncHandler(async (req, res) => {
  const paginationOptions = pickOptions(req.query as QueryObject, [
    "page",
    "limit",
    "sortOrder",
    "sortBy",
  ]) as PaginationOptions;

  const filters = pickOptions(req.query as QueryObject, [
    "genre",
    "publicationDate",
    "searchTerm",
  ]) as FilterOptions;

  const result = await getAllBooksService(paginationOptions, filters);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Books retrieved successfully",
    data: result.data,
    meta: result.meta,
    filterData: result.filterData,
  });
});

export const getSingleBook = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await getSingleBookService(id);

  sendResponse<TBook>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Book retrieved successfully",
    data: book,
  });
});

export const updateBook = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const { _id, email } = req.payload;

  const updatedBook = await updateBookService(id, payload, { _id, email });

  sendResponse<TBook>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Book updated successfully",
    data: updatedBook,
  });
});

export const deleteBook = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteBookService(id, req.payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Book deleted successfully",
    data: result,
  });
});

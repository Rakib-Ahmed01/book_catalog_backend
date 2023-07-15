import { StatusCodes } from "http-status-codes";
import { AuthPayload } from "../../types";
import { FilterOptions } from "../../types/FilterOptions";
import { PaginationOptions } from "../../types/PaginationOptions";
import { PaginationResponse } from "../../types/PaginationResponse";
import { calculateSkip } from "../../utils/calculateSkip";
import { generateSearchCondition } from "../../utils/generateSearchCondition";
import { handleFilters } from "../../utils/handleFilters";
import throwApiError from "../../utils/throwApiError";
import User from "../user/user.model";
import { TBook } from "./book.interface";
import Book from "./book.model";

export const createBookService = async (
  book: TBook,
  payload: AuthPayload | null,
) => {
  const { _id, email } = payload || {};
  const user = await User.findOne({ _id, email });

  if (!user) {
    throwApiError(StatusCodes.BAD_REQUEST, "Author email not found");
  }

  if (book.email !== user.email) {
    throwApiError(
      StatusCodes.FORBIDDEN,
      "Forbidden Access. You are using another user's email",
    );
  }

  const createdBook = await Book.create(book);
  return createdBook;
};

export const getAllBooksService = async (
  paginationOptions: PaginationOptions,
  filterOptions: FilterOptions,
): Promise<PaginationResponse<TBook[]>> => {
  const { limit, page, skip } = calculateSkip(paginationOptions);
  const { sortBy, sortOrder } = paginationOptions;
  const { searchTerm, ...filters } = filterOptions;
  const filterObj = handleFilters(filters as FilterOptions);

  const searchCondition = generateSearchCondition("or", searchTerm, [
    "title",
    "author",
    "genre",
  ]);

  const [books, total] = await Promise.all([
    Book.find({ $and: [searchCondition, filterObj] })
      .skip(skip)
      .limit(limit)
      .sort({
        [sortBy]: sortOrder,
      })
      .lean(),
    Book.countDocuments(),
  ]);

  return {
    data: books,
    meta: {
      limit,
      page,
      total,
    },
  };
};

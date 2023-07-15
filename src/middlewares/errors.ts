import { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { ApiError } from "../error/ApiError";
import { handleMongoServerError } from "../error/handleMongoServerError";
import { handleValidationError } from "../error/handleMongooseValidationError";
import { handleZodValidationError } from "../error/handleZodValidationError";
import { GenericErrorMessage } from "../types/GenericErrorMessage";
import throwApiError from "../utils/throwApiError";

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  const error = throwApiError(StatusCodes.NOT_FOUND, "404 Resource not found!");
  next(error);
};

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _next,
) => {
  const errors: GenericErrorMessage[] = [];
  let status = error?.status ? error.status : 500;

  const errorResponse = {
    success: false,
    message: "Something went wrong!",
    errors: errors,
    stack: process.env.NODE_ENV !== "production" ? error?.stack : null,
  };

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    status = simplifiedError.status;
    errorResponse.message = simplifiedError.message;
    errorResponse.errors = simplifiedError.errors;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodValidationError(error);
    status = simplifiedError.status;
    errorResponse.message = simplifiedError.message;
    errorResponse.errors = simplifiedError.errors;
  } else if (error instanceof ApiError) {
    errorResponse.message = error.message;
    errorResponse.errors = [{ path: "", message: error.message }];
  } else if (error.name === "CastError") {
    errorResponse.message = `Invalid ${error.path}`;
    errorResponse.errors = [
      {
        path: error.path,
        message: `Invalid ${error.path}`,
      },
    ];
  } else if (error.name === "MongoServerError") {
    const simplifiedError = handleMongoServerError(error);
    status = simplifiedError.status;
    errorResponse.message = simplifiedError.message;
    errorResponse.errors = simplifiedError.errors;
  } else if (error instanceof Error) {
    errorResponse.message = error?.message
      ? error.message
      : errorResponse.message;
    errorResponse.errors = [
      {
        path: "",
        message: error?.message ? error.message : errorResponse.message,
      },
    ];
  }

  res.status(status).json(errorResponse);
};

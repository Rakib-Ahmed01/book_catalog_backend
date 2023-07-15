import { StatusCodes } from "http-status-codes";
import { GenericErrorMessage } from "../types/GenericErrorMessage";
import { ValidationErrorResponse } from "../types/ValidationErrorResponse";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleMongoServerError = (error: any): ValidationErrorResponse => {
  const errors: GenericErrorMessage[] = [];

  if (error?.code === 11000) {
    errors.push({
      message: `Duplicate ${Object.keys(error.keyValue)[0]}`,
      path: `${Object.keys(error.keyValue)[0]}`,
    });
  }

  return {
    errors,
    status: StatusCodes.BAD_REQUEST,
    message: "Duplicate Key Error",
  };
};

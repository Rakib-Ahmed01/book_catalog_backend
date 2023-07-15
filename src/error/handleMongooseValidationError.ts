import mongoose from "mongoose";
import { GenericErrorMessage } from "../types/GenericErrorMessage";
import { ValidationErrorResponse } from "../types/ValidationErrorResponse";

export const handleValidationError = (
  error: mongoose.Error.ValidationError,
): ValidationErrorResponse => {
  const errors: GenericErrorMessage[] = Object.values(error.errors).map(
    (err) => {
      return {
        path: err?.path,
        message: err?.message.replace("Path ", ""),
      };
    },
  );

  return {
    status: 400,
    message: "Validation Error",
    errors,
  };
};

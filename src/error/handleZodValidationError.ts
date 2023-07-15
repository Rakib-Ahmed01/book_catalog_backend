import { ZodError } from "zod";
import { GenericErrorMessage } from "../types/GenericErrorMessage";
import { ValidationErrorResponse } from "../types/ValidationErrorResponse";

export const handleZodValidationError = (
  error: ZodError,
): ValidationErrorResponse => {
  const errors: GenericErrorMessage[] = error.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    status: 400,
    message: "Validation Error",
    errors,
  };
};

import { GenericErrorMessage } from "./GenericErrorMessage";

export type ValidationErrorResponse = {
  status: number;
  message: string;
  errors: GenericErrorMessage[];
};

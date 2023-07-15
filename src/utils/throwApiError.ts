import { ApiError } from "../error/ApiError";

export default function throwApiError(status: number, message: string): never {
  throw new ApiError(status, message);
}

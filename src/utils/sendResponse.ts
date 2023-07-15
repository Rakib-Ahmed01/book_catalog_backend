import { Response } from "express";
import { ApiResponse } from "../types/ApiResponse";

export const sendResponse = <T>(res: Response, response: ApiResponse<T>) => {
  res.status(response.statusCode).json(response);
};

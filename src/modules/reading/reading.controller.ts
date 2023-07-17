import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { TReading } from "./reading.interface";
import {
  createReadingService,
  deleteReadingService,
  getAllReadingsService,
} from "./reading.services";

export const createReading = expressAsyncHandler(async (req, res) => {
  const reading = await createReadingService(req.body);

  sendResponse<TReading>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Reading created successfully",
    data: reading,
  });
});

export const getAllReadings = expressAsyncHandler(async (req, res) => {
  const { email } = req.query;
  const readings = await getAllReadingsService(email as string);

  sendResponse<TReading>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Readings retrieved successfully",
    data: readings,
  });
});

export const deleteReading = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteReadingService(id, req.payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Reading deleted successfully",
    data: result,
  });
});

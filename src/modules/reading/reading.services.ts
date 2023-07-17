import { StatusCodes } from "http-status-codes";
import { isValidObjectId } from "mongoose";
import { AuthPayload } from "../../types/AuthPayload";
import throwApiError from "../../utils/throwApiError";
import { TReading } from "./reading.interface";
import { Reading } from "./reading.model";

export const createReadingService = async (reading: TReading) => {
  const createdReading = await Reading.create(reading);
  return createdReading;
};

export const getAllReadingsService = async (email: string) => {
  const readings = await Reading.find({ email })
    .select("bookId")
    .populate("bookId")
    .lean();
  return readings;
};

export const deleteReadingService = async (
  id: string,
  authPayload: AuthPayload,
) => {
  const { email } = authPayload;

  if (!isValidObjectId(id)) {
    throwApiError(StatusCodes.BAD_REQUEST, "Invalid reading id");
  }

  const reading = await Reading.findOne({ _id: id, email });

  if (!reading) {
    throwApiError(StatusCodes.NOT_FOUND, "Reading not found");
  } else if (reading.email !== email) {
    throwApiError(
      StatusCodes.FORBIDDEN,
      "Forbidden Access. You can not delete another user's reading",
    );
  }

  const result = await Reading.deleteOne({ _id: id, email });

  return result;
};

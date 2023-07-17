import express from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../utils/validateRequest";
import {
  createReading,
  deleteReading,
  getAllReadings,
} from "./reading.controller";
import { createReadingZodSchema } from "./reading.validation";

export const readingRouter = express.Router();

readingRouter.delete("/:id", auth(), deleteReading);

readingRouter
  .route("/")
  .get(auth(), getAllReadings)
  .post(auth(), validateRequest(createReadingZodSchema), createReading);

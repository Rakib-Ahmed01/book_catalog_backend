import { Schema, model } from "mongoose";
import { validateEmail } from "../../utils/validateEmail";
import { ReadingModel, TReading } from "./reading.interface";

const readingSchema = new Schema<TReading, ReadingModel>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "{PATH} is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: validateEmail,
        message: "Please provide a valid email",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Reading = model<TReading, ReadingModel>("Reading", readingSchema);

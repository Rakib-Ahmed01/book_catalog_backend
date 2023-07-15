import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler, notFoundHandler } from "./middlewares/errors";

const app: Application = express();

app.use([cors(), express.json(), express.urlencoded({ extended: true })]);

// Home Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Book Catalog Server...🐱‍🏍" });
});

// error handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;

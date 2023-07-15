import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler, notFoundHandler } from "./middlewares/errors";
import { router } from "./routes";

const app: Application = express();

app.use([
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
]);

// Home Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Book Catalog Server...🐱‍🏍" });
});

app.get("/api/v1", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Book Catalog Server...🐱‍🏍" });
});

app.use("/api/v1", router);

// error handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;

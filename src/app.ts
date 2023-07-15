import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use([cors(), express.json(), express.urlencoded({ extended: true })]);

// TESTING
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Book Catalog Server...🐱‍🏍" });
});

// error handlers

export default app;

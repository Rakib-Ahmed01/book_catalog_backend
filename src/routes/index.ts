import express, { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { bookRouter } from "../modules/book/book.route";

export const router = express.Router();

type Route = {
  path: string;
  router: Router;
};

const routes: Route[] = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/books",
    router: bookRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.router));

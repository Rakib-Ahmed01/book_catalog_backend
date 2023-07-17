import express, { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { bookRouter } from "../modules/book/book.route";
import { readingRouter } from "../modules/reading/reading.route";
import { reviewRouter } from "../modules/review/review.route";
import { wishListRouter } from "../modules/wishlist/wishlist.route";

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
  {
    path: "/reviews",
    router: reviewRouter,
  },
  {
    path: "/wishlists",
    router: wishListRouter,
  },
  {
    path: "/readings",
    router: readingRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.router));

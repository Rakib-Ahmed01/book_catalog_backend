import express, { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";

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
];

routes.forEach((route) => router.use(route.path, route.router));

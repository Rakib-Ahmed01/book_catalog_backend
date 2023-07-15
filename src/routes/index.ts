import express, { Router } from "express";

export const router = express.Router();

type Route = {
  path: string;
  router: Router;
};

const routes: Route[] = [];

routes.forEach((route) => router.use(route.path, route.router));

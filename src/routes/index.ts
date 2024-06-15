import { Application, Router } from "express";
import PostRouter from "./post.route";
import AuthRouter from "./auth.route";

const _routes: Array<[string, Router]> = [
  ["/posts", PostRouter],
  ["/auth", AuthRouter],
];

const routes = (app: Application) => {
  _routes.forEach(([path, router]) => app.use("/api" + path, router));
};

export default routes;

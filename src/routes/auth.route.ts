import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const AuthRouter: Router = Router();

AuthRouter.post(`/signup`, AuthController.signup);

export default AuthRouter;

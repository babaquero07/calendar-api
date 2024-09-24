import { Router } from "express";
import { authRouter } from "./auth/auth.controller.js";

const routes = Router();

routes.use("/auth", authRouter);

export default routes;

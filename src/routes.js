import { Router } from "express";
import { authRouter } from "./auth/auth.controller.js";
import { eventsRouter } from "./events/events.controller.js";
import { validateJWT } from "./auth/middlewares/validate-jwt.js";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/events", validateJWT, eventsRouter);

export default routes;

import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "./middleware/auth-validator.js";
import { validate } from "../common/middleware/validator.js";

export const authRouter = Router();

authRouter.post("/", validate(loginValidator), (req, res) => {
  const { email, password } = req.body;

  res.send({
    ok: true,
    message: "login route",
    email,
    password,
  });
});

authRouter.post("/register", validate(registerValidator), (req, res) => {
  const { name, email, password } = req.body;

  res.send({
    ok: true,
    message: "register route",
    name,
    email,
  });
});

authRouter.get("/renew", (req, res) => {});

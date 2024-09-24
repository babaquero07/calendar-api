import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "./middlewares/auth-validator.js";
import { validate } from "../common/middlewares/validator.js";
import { AuthService } from "./auth.service.js";

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

authRouter.post("/register", validate(registerValidator), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await AuthService.findUserByEmail(email);
    if (user)
      return res.status(400).send({
        ok: false,
        message: `User with email: ${email}, already exists`,
      });

    const newUser = await AuthService.createUser(name, email, password);

    res.status(201).send({
      ok: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      ok: false,
      message: "Internal server error",
    });
  }
});

authRouter.get("/renew", (req, res) => {});

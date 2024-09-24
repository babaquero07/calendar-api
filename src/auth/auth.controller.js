import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "./middlewares/auth-validator.js";
import { validate } from "../common/middlewares/validator.js";
import { AuthService } from "./auth.service.js";
import { validateJWT } from "./middlewares/validate-jwt.js";

export const authRouter = Router();

authRouter.post("/", validate(loginValidator), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthService.findUserByEmail(email);
    if (!user)
      return res.status(400).send({
        ok: false,
        message: "The user does not exist with that email",
      });

    const validPassword = await AuthService.isPasswordValid(
      password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send({
        ok: false,
        message: "Invalid password",
      });

    const token = await AuthService.generateJWT(user._id, user.name);

    res.send({
      ok: true,
      message: "User logged in successfully",
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      ok: false,
      message: "Internal server error",
    });
  }
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

authRouter.get("/renew", validateJWT, async (req, res) => {
  try {
    const { uid, name } = req.jwtData;

    const token = await AuthService.generateJWT(uid, name);

    res.send({
      ok: true,
      message: "Token renewed successfully",
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      ok: false,
      message: "Internal server error",
    });
  }
});

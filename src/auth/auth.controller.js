import { Router } from "express";

export const authRouter = Router();

authRouter.post("/", (req, res) => {
  const { email, password } = req.body;

  res.send({
    ok: true,
    message: "login route",
    email,
    password,
  });
});

authRouter.post("/register", (req, res) => {
  res.send({
    ok: true,
    message: "register route",
    name,
    email,
  });
});

authRouter.get("/renew", (req, res) => {});

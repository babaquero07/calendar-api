import { Router } from "express";

export const authRouter = Router();

authRouter.post("/", (req, res) => {});

authRouter.post("/register", (req, res) => {
  res.send({
    ok: true,
    message: "register route",
  });
});

authRouter.get("/renew", (req, res) => {});

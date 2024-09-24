import { response } from "express";
import jwt from "jsonwebtoken";

export const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token)
    return res.status(401).send({
      ok: false,
      message: "Token is required",
    });

  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);
    req.jwtData = { uid, name };

    next();
  } catch (error) {
    console.error(error);

    res.status(401).send({
      ok: false,
      message: "Invalid token",
    });
  }
};

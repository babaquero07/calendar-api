import { body } from "express-validator";

export const registerValidator = [
  body("name", "Name is required")
    .not()
    .isEmpty()
    .withMessage("Name is required"),
  body("email", "Email is required").isEmail().withMessage("Email is invalid"),
  body("password", "Password is required").isLength({ min: 8 }),
];

export const loginValidator = [
  body("email", "Email is required").isEmail().withMessage("Email is invalid"),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .withMessage("Password is required"),
];

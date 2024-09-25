import { body } from "express-validator";

export const registerValidator = [
  body("name", "Name is required").not().isEmpty(),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const loginValidator = [
  body("email", "Email is required").isEmail().withMessage("Email is invalid"),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .withMessage("Password is required"),
];

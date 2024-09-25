import { body } from "express-validator";

export const newEventValidator = [
  body("title").isString().withMessage("Title is required"),
  body("notes").isString().withMessage("Notes are required"),
  body("start").notEmpty().withMessage("Start is required"),
  body("end").notEmpty().withMessage("End is required"),
];

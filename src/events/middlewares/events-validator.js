import { body, param } from "express-validator";

export const idValidator = param("id").notEmpty().withMessage("Id is required");

export const newEventValidator = [
  body("title").isString().withMessage("Title is required"),
  body("notes").isString().withMessage("Notes are required"),
  body("start").notEmpty().withMessage("Start is required"),
  body("end").notEmpty().withMessage("End is required"),
];

export const updateEventValidator = [
  idValidator,
  body("title").optional().isString().withMessage("Title must be a string"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
];

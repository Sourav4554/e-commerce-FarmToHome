import { body } from "express-validator";

export const profileUpdateValidation = [
  body("name").notEmpty().trim().withMessage("Name is required"),

  body("avatar").trim(),

  body("email").notEmpty().trim().isEmail().withMessage("Invalid Email"),

  body("phone")
    .notEmpty()
    .trim()
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone Number"),

  body("whatsapp")
    .notEmpty()
    .trim()
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone Number"),

  body("district").notEmpty().trim().withMessage("District is required"),

  body("panchayth").notEmpty().trim().withMessage("panchayath is required"),

  body("ward").notEmpty().trim().withMessage("ward is required"),
];

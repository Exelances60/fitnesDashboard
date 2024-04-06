import { body } from "express-validator";
import { customePhoneValidator } from "../BaseCustomValidator";

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Email not valid")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];

export const updateOwnerValidator = [
  body("email").isEmail().withMessage("Email not valid").normalizeEmail(),
  body("phone").custom(customePhoneValidator).trim(),
  body("memberShipPrice").isInt().withMessage("Price not valid"),
];

import { body } from "express-validator";
import {
  customeAgeValidator,
  customeBodyWeightValidator,
  customeHeightValidator,
  customePhoneValidator,
} from "../BaseCustomValidator";

export const addCustomerValidator = [
  body("name").trim().isLength({ min: 3 }),
  body("phone")
    .custom(customePhoneValidator)
    .trim()
    .withMessage("Phone number is required"),
  body("email").isEmail().normalizeEmail().withMessage("Email not valid"),
  body("age").isNumeric().custom(customeAgeValidator),
  body("bodyWeight")
    .custom(customeBodyWeightValidator)
    .withMessage("Body weight is required"),
  body("height").custom(customeHeightValidator),
  body("membershipMonths").notEmpty().withMessage("Membership months required"),
  body("membershipPrice")
    .notEmpty()
    .withMessage("Membership price required")
    .custom((value) => {
      const parsetValue = parseInt(value);
      if (isNaN(parsetValue)) {
        throw new Error("Membership price must be numeric");
      }
      return true;
    }),
];

export const customerUpdateValidator = [
  body("name").trim().isLength({ min: 3 }),
  body("phone")
    .custom(customePhoneValidator)
    .trim()
    .withMessage("Phone number is required"),
  body("email").isEmail().normalizeEmail().withMessage("Email not valid"),
  body("age").isNumeric().custom(customeAgeValidator),
  body("bodyWeight")
    .custom(customeBodyWeightValidator)
    .withMessage("Body weight is required"),
  body("height").custom(customeHeightValidator),
  body("membershipMonths").isNumeric(),
  body("membershipPrice").isNumeric(),
];

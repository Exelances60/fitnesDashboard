import { body } from "express-validator";

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
  body("phone")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number not valid")
    .trim()
    .custom((value) => {
      if (parseInt(value) <= 0) {
        throw new Error("Phone number not valid");
      }
      return true;
    }),
  body("memberShipPrice").isInt().withMessage("Price not valid"),
];

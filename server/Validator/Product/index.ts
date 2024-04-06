import { body } from "express-validator";

export const addProductValidator = [
  body("productName")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long."),
  body("price").custom((value) => {
    const price = parseFloat(value);
    if (isNaN(price)) {
      throw new Error("Price must be a number.");
    }
    return true;
  }),
  body("description")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters long."),
  body("amount").custom((value) => {
    const amount = parseInt(value);
    if (isNaN(amount)) {
      throw new Error("Amount must be a number.");
    }
    return true;
  }),
];

export const updateProductValidator = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long."),
  body("price").custom((value) => {
    const price = parseFloat(value);
    if (isNaN(price)) {
      throw new Error("Price must be a number.");
    }
    return true;
  }),
  body("description")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters long."),
  body("amount").custom((value) => {
    const amount = parseInt(value);
    if (isNaN(amount)) {
      throw new Error("Amount must be a number.");
    }
    return true;
  }),
];

import { body } from "express-validator";
import Product from "../../models/Product";

export const createOrderValidator = [
  body("productName")
    .isString()
    .withMessage("Product name must be string")
    .notEmpty()
    .withMessage("Product name must be not empty"),
  body("price")
    .isNumeric()
    .withMessage("Price must be number")
    .isFloat({ min: 0, max: 1000000 })
    .withMessage("Price must be between 0 and 1000000")
    .notEmpty()
    .withMessage("Price must be not empty"),
  body("amount")
    .isNumeric()
    .withMessage("Amount must be number")
    .custom(async (value, { req }) => {
      const { productId } = req.body;
      const product = await Product.findById(productId);
      if (!product) throw new Error("Product not found.");
      if (value > product.amount)
        throw new Error("The amount of product is not enough.");
      if (product.amount === 0) throw new Error("The product is out of stock.");
    })
    .notEmpty()
    .withMessage("Amount must be not empty"),
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("Email must be not empty"),
  body("address")
    .isString()
    .isLength({ min: 5 })
    .withMessage("Address length must be greater than 5")
    .notEmpty()
    .withMessage("Address must be not empty"),
  body("phone")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Phone length must be greater than 10")
    .notEmpty()
    .withMessage("Phone must be not empty"),
];

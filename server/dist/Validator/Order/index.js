"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderValidator = void 0;
const express_validator_1 = require("express-validator");
const Product_1 = __importDefault(require("../../models/Product"));
const BaseCustomValidator_1 = require("../BaseCustomValidator");
exports.createOrderValidator = [
    (0, express_validator_1.body)("productName")
        .isString()
        .withMessage("Product name must be string")
        .notEmpty()
        .withMessage("Product name must be not empty"),
    (0, express_validator_1.body)("price")
        .isNumeric()
        .withMessage("Price must be number")
        .isFloat({ min: 0, max: 1000000 })
        .withMessage("Price must be between 0 and 1000000")
        .notEmpty()
        .withMessage("Price must be not empty"),
    (0, express_validator_1.body)("amount")
        .isNumeric()
        .withMessage("Amount must be number")
        .custom(async (value, { req }) => {
        const { productId } = req.body;
        const product = await Product_1.default.findById(productId);
        if (!product)
            throw new Error("Product not found.");
        if (value > product.amount)
            throw new Error("The amount of product is not enough.");
        if (product.amount === 0)
            throw new Error("The product is out of stock.");
    })
        .notEmpty()
        .withMessage("Amount must be not empty"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Invalid email format")
        .notEmpty()
        .withMessage("Email must be not empty"),
    (0, express_validator_1.body)("address")
        .isString()
        .isLength({ min: 5 })
        .withMessage("Address length must be greater than 5")
        .notEmpty()
        .withMessage("Address must be not empty"),
    (0, express_validator_1.body)("phone")
        .custom(BaseCustomValidator_1.customePhoneValidator)
        .notEmpty()
        .withMessage("Phone must be not empty"),
];
//# sourceMappingURL=index.js.map
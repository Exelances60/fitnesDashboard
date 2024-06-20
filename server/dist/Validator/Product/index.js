"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidator = exports.addProductValidator = void 0;
const express_validator_1 = require("express-validator");
exports.addProductValidator = [
    (0, express_validator_1.body)("productName")
        .isLength({ min: 3 })
        .withMessage("Product name must be at least 3 characters long."),
    (0, express_validator_1.body)("price").custom((value) => {
        const price = parseFloat(value);
        if (isNaN(price)) {
            throw new Error("Price must be a number.");
        }
        return true;
    }),
    (0, express_validator_1.body)("description")
        .isLength({ min: 5 })
        .withMessage("Description must be at least 5 characters long."),
    (0, express_validator_1.body)("amount").custom((value) => {
        const amount = parseInt(value);
        if (isNaN(amount)) {
            throw new Error("Amount must be a number.");
        }
        return true;
    }),
];
exports.updateProductValidator = [
    (0, express_validator_1.body)("name")
        .isLength({ min: 3 })
        .withMessage("Product name must be at least 3 characters long."),
    (0, express_validator_1.body)("price").custom((value) => {
        const price = parseFloat(value);
        if (isNaN(price)) {
            throw new Error("Price must be a number.");
        }
        return true;
    }),
    (0, express_validator_1.body)("description")
        .isLength({ min: 5 })
        .withMessage("Description must be at least 5 characters long."),
    (0, express_validator_1.body)("amount").custom((value) => {
        const amount = parseInt(value);
        if (isNaN(amount)) {
            throw new Error("Amount must be a number.");
        }
        return true;
    }),
];
//# sourceMappingURL=index.js.map
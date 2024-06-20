"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerUpdateValidator = exports.addCustomerValidator = void 0;
const express_validator_1 = require("express-validator");
const BaseCustomValidator_1 = require("../BaseCustomValidator");
exports.addCustomerValidator = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 3 }),
    (0, express_validator_1.body)("phone")
        .custom(BaseCustomValidator_1.customePhoneValidator)
        .trim()
        .withMessage("Phone number is required"),
    (0, express_validator_1.body)("email").isEmail().normalizeEmail().withMessage("Email not valid"),
    (0, express_validator_1.body)("age").isNumeric().custom(BaseCustomValidator_1.customeAgeValidator),
    (0, express_validator_1.body)("bodyWeight")
        .custom(BaseCustomValidator_1.customeBodyWeightValidator)
        .withMessage("Body weight is required"),
    (0, express_validator_1.body)("height").custom(BaseCustomValidator_1.customeHeightValidator),
    (0, express_validator_1.body)("membershipMonths").notEmpty().withMessage("Membership months required"),
    (0, express_validator_1.body)("membershipPrice")
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
exports.customerUpdateValidator = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 3 }),
    (0, express_validator_1.body)("phone")
        .custom(BaseCustomValidator_1.customePhoneValidator)
        .trim()
        .withMessage("Phone number is required"),
    (0, express_validator_1.body)("email").isEmail().normalizeEmail().withMessage("Email not valid"),
    (0, express_validator_1.body)("age").isNumeric().custom(BaseCustomValidator_1.customeAgeValidator),
    (0, express_validator_1.body)("bodyWeight")
        .custom(BaseCustomValidator_1.customeBodyWeightValidator)
        .withMessage("Body weight is required"),
    (0, express_validator_1.body)("height").custom(BaseCustomValidator_1.customeHeightValidator),
    (0, express_validator_1.body)("membershipMonths").isNumeric(),
    (0, express_validator_1.body)("membershipPrice").isNumeric(),
];
//# sourceMappingURL=index.js.map
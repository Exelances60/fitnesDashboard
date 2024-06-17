"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOwnerValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
const BaseCustomValidator_1 = require("../BaseCustomValidator");
exports.loginValidator = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email not valid")
        .notEmpty()
        .withMessage("Email is required"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long"),
];
exports.updateOwnerValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email not valid").normalizeEmail(),
    (0, express_validator_1.body)("phone").custom(BaseCustomValidator_1.customePhoneValidator).trim(),
    (0, express_validator_1.body)("memberShipPrice").isInt().withMessage("Price not valid"),
];
//# sourceMappingURL=index.js.map
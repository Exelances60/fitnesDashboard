"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeValidator = exports.assignCustomerValidator = exports.createEmployeesValidator = exports.customeAgeValidator = void 0;
const express_validator_1 = require("express-validator");
const customeAgeValidator = (value) => {
    if (+value < 18) {
        throw new Error("Age must be greater than 18");
    }
    else if (+value > 80) {
        throw new Error("Age must be less than 60");
    }
    return true;
};
exports.customeAgeValidator = customeAgeValidator;
exports.createEmployeesValidator = [
    (0, express_validator_1.body)("name")
        .isString()
        .isLength({ min: 2 })
        .withMessage("Name less than 2")
        .notEmpty()
        .withMessage("Name is required"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email not valid")
        .notEmpty()
        .withMessage("Email is required"),
    (0, express_validator_1.body)("phone")
        .isString()
        .isLength({ min: 10 })
        .withMessage("Phone less than 10")
        .notEmpty(),
    (0, express_validator_1.body)("age").custom(exports.customeAgeValidator).isInt().notEmpty(),
    (0, express_validator_1.body)("hireDate").notEmpty().withMessage("Hire date is required"),
    (0, express_validator_1.body)("salary")
        .custom((value) => {
        const salary = parseInt(value);
        if (!salary) {
            throw new Error("Salary is required");
        }
        return true;
    })
        .notEmpty(),
    (0, express_validator_1.body)("ownerId").notEmpty().withMessage("Owner is required").isString(),
];
exports.assignCustomerValidator = [
    (0, express_validator_1.body)("employeeId").notEmpty().withMessage("Employee is required").isString(),
    (0, express_validator_1.body)("customerId").notEmpty().withMessage("Customer is required").isString(),
];
exports.updateEmployeeValidator = [
    (0, express_validator_1.body)("name").isLength({ min: 2 }).withMessage("Name less than 2").notEmpty(),
    (0, express_validator_1.body)("email").isEmail().withMessage("Email not valid").notEmpty(),
    (0, express_validator_1.body)("phone")
        .isLength({ min: 10 })
        .withMessage("Phone less than 10")
        .isInt()
        .notEmpty(),
    (0, express_validator_1.body)("age").custom(exports.customeAgeValidator).isInt().notEmpty(),
    (0, express_validator_1.body)("hireDate").notEmpty().withMessage("Hire date is required"),
    (0, express_validator_1.body)("salary").isInt().notEmpty().withMessage("Salary is required"),
];
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.assignCustomer = exports.getEmployees = exports.createEmployee = void 0;
const throwBadRequestError_1 = __importDefault(require("../utils/err/throwBadRequestError"));
const calculateEmployessIncares_1 = require("../services/businessLogic/calculateEmployessIncares");
const express_validator_1 = require("express-validator");
const printValidatorErrors_1 = require("../utils/printValidatorErrors");
const EmployeesServices_1 = require("../services/EmployeesServices");
const createEmployee = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        (0, printValidatorErrors_1.printValidatorErrors)(errors);
        const savedEmployee = await new EmployeesServices_1.EmployeesServices().createEmployee(req);
        res.status(201).json({
            message: "Employee created successfully",
            savedEmployee,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.createEmployee = createEmployee;
const getEmployees = async (req, res, next) => {
    try {
        const ownerId = req.userId;
        if (!ownerId)
            return (0, throwBadRequestError_1.default)("Owner id is required");
        const employees = await new EmployeesServices_1.EmployeesServices().getEmployees(ownerId);
        const totalEmployeesCountIncarese = (0, calculateEmployessIncares_1.currentMonthEmployeesCountIncarese)(employees);
        res.status(200).json({
            employees: employees,
            totalEmployeesCountIncarese,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.getEmployees = getEmployees;
const assignCustomer = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        (0, printValidatorErrors_1.printValidatorErrors)(errors);
        await new EmployeesServices_1.EmployeesServices().assignCustomer(req);
        res.status(200).json({ message: "Customer assigned successfully" });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.assignCustomer = assignCustomer;
const updateEmployee = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        (0, printValidatorErrors_1.printValidatorErrors)(errors);
        await new EmployeesServices_1.EmployeesServices().updateEmployee(req);
        res.status(200).json({
            message: "Employee updated successfully",
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res, next) => {
    try {
        await new EmployeesServices_1.EmployeesServices().deleteEmployee(req);
        res.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employees.js.map
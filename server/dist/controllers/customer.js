"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerCoach = exports.addCustomerActivity = exports.updateCustomerPlan = exports.deleteCustomerExercisePlan = exports.findCustomer = exports.deleteCustomer = exports.updateCustomer = exports.getCustomer = exports.addCustomer = void 0;
const express_validator_1 = require("express-validator");
const throwValidationError_1 = __importDefault(require("../utils/err/throwValidationError"));
const throwBadRequestError_1 = __importDefault(require("../utils/err/throwBadRequestError"));
const CustomerServices_1 = require("../services/CustomerServices");
const addCustomer = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            (0, throwValidationError_1.default)("Validation failed, entered data is incorrect.");
        }
        const responseCustomer = await new CustomerServices_1.CustomerServices().addCustomer(req);
        res.status(201).json({
            message: "Customer created successfully!",
            customer: responseCustomer,
            status: 201,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addCustomer = addCustomer;
const getCustomer = async (req, res, next) => {
    try {
        const ownerId = req.userId;
        if (!ownerId)
            return (0, throwBadRequestError_1.default)("Owner not found.");
        const fetchedCustomer = new CustomerServices_1.CustomerServices().getCustomer(ownerId);
        res.status(200).json({
            message: "Fetched customer successfully!",
            customers: fetchedCustomer,
            status: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCustomer = getCustomer;
const updateCustomer = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            (0, throwValidationError_1.default)("Validation failed, entered data is incorrect.");
        }
        const responseUpdateCustomer = await new CustomerServices_1.CustomerServices().updateCustomer(req);
        res.status(200).json({
            message: "Customer updated successfully!",
            customer: responseUpdateCustomer,
            status: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (req, res, next) => {
    try {
        if (!req.params.customerId)
            (0, throwBadRequestError_1.default)("Customer not found.");
        await new CustomerServices_1.CustomerServices().deleteCustomer(req.params.customerId);
        res.status(200).json({
            message: "Customer deleted successfully!",
            status: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCustomer = deleteCustomer;
const findCustomer = async (req, res, next) => {
    try {
        const responseCustomer = await new CustomerServices_1.CustomerServices().findCustomer(req.params.customerId);
        res.status(200).json({
            message: "Fetched customer successfully!",
            customer: responseCustomer,
            status: 200,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.findCustomer = findCustomer;
const deleteCustomerExercisePlan = async (req, res, next) => {
    try {
        const updatedCustomer = new CustomerServices_1.CustomerServices().deleteCustomerExercisePlan(req);
        res.status(200).json({
            message: "Customer exercise plan deleted successfully!",
            customer: updatedCustomer,
            status: 200,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.deleteCustomerExercisePlan = deleteCustomerExercisePlan;
const updateCustomerPlan = async (req, res, next) => {
    try {
        if (!req.body.customerId)
            (0, throwBadRequestError_1.default)("Customer not found.");
        await new CustomerServices_1.CustomerServices().updateCustomerExercisePlan(req);
        res.status(200).json({
            message: "Customer exercise plan updated successfully!",
            status: 200,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.updateCustomerPlan = updateCustomerPlan;
const addCustomerActivity = async (req, res, next) => {
    try {
        if (!req.body.customerId)
            (0, throwBadRequestError_1.default)("Customer not found.");
        const savedActivity = await new CustomerServices_1.CustomerServices().addCustomerActivity(req);
        res.status(201).json({
            message: "Customer activity added successfully!",
            activity: savedActivity,
            status: 201,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.addCustomerActivity = addCustomerActivity;
const deleteCustomerCoach = async (req, res, next) => {
    try {
        if (!req.body.customerId)
            (0, throwBadRequestError_1.default)("Customer not found.");
        await new CustomerServices_1.CustomerServices().deleteCustomerCoach(req.body.customerId);
        res.status(200).json({
            message: "Customer coach deleted successfully!",
            status: 200,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.deleteCustomerCoach = deleteCustomerCoach;
//# sourceMappingURL=customer.js.map
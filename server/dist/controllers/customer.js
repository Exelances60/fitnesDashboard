"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerCoach = exports.addCustomerActivity = exports.updateCustomerPlan = exports.deleteCustomerExercisePlan = exports.findCustomer = exports.deleteCustomer = exports.updateCustomer = exports.getCustomer = exports.addCustomer = void 0;
const express_validator_1 = require("express-validator");
const throwValidationError_1 = __importDefault(require("../utils/err/throwValidationError"));
const throwBadRequestError_1 = __importDefault(require("../utils/err/throwBadRequestError"));
const Owner_1 = __importDefault(require("../models/Owner"));
const Customer_1 = __importDefault(require("../models/Customer"));
const Exercise_1 = __importDefault(require("../models/Exercise"));
const CalenderAcv_1 = __importDefault(require("../models/CalenderAcv"));
const Employees_1 = __importDefault(require("../models/Employees"));
const FirebaseServices_1 = __importDefault(require("../utils/FirebaseServices"));
const customerService_1 = __importDefault(require("../services/customerService"));
const addCustomer = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, throwValidationError_1.default)("Validation failed, entered data is incorrect.");
    }
    try {
        const { age, bodyWeight, height, membershipMonths, membershipPrice, coach, ownerId, parentPhone, } = req.body;
        const fetchedOwner = await Owner_1.default.findById(ownerId);
        if (!fetchedOwner) {
            return (0, throwBadRequestError_1.default)("Owner not found.");
        }
        const downloadURL = await FirebaseServices_1.default.uploadImageToStorage(req.file, "customers/");
        const customer = new Customer_1.default({
            ...req.body,
            coachPT: coach || null,
            age: +age,
            bodyWeight: +bodyWeight,
            height: +height,
            membershipPrice: +membershipPrice,
            membershipStartDate: new Date(),
            membershipEndDate: new Date(new Date().setMonth(new Date().getMonth() + +membershipMonths)),
            membershipType: membershipMonths,
            exercisePlan: [],
            profilePicture: downloadURL,
            parentPhone: parentPhone ? parentPhone : null,
        });
        const savedCustomer = await customer.save();
        fetchedOwner.customer.push(savedCustomer._id);
        await fetchedOwner.save();
        res.status(201).json({
            message: "Customer created successfully!",
            customer: savedCustomer,
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
        const fetchedCustomer = await customerService_1.default.getCustomerByOwnerId(ownerId);
        res.status(200).json({
            message: "Fetched customers successfully!",
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
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, throwValidationError_1.default)("Validation failed, entered data is incorrect.");
    }
    const { _id, ownerId } = req.body;
    try {
        const fetchedOwner = await Owner_1.default.findById(ownerId);
        if (!fetchedOwner) {
            return (0, throwBadRequestError_1.default)("Owner not found.");
        }
        if (!fetchedOwner.customer.includes(_id)) {
            return (0, throwBadRequestError_1.default)("Customer not found.");
        }
        let customer = await Customer_1.default.findById(_id);
        if (!customer) {
            return (0, throwBadRequestError_1.default)("Customer not found.");
        }
        customer = {
            ...req.body,
            membershipType: req.body.membershipMonths,
            membershipPrice: req.body.membershipPrice,
            membershipStatus: req.body.membershipStatus,
            exercisePlan: req.body.exercisePlan || customer.exercisePlan,
        };
        const updatedCustomer = await customer?.save();
        res.status(200).json({
            message: "Customer updated successfully!",
            customer: updatedCustomer,
            status: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (req, res, next) => {
    const customerId = req.params.customerId;
    if (!customerId)
        (0, throwBadRequestError_1.default)("Customer not found.");
    try {
        const customer = await Customer_1.default.findById(customerId);
        if (!customer) {
            return (0, throwBadRequestError_1.default)("Customer not found.");
        }
        const ownerId = customer.ownerId;
        const fetchedOwner = await Owner_1.default.findById(ownerId);
        if (!fetchedOwner) {
            return (0, throwBadRequestError_1.default)("Owner not found.");
        }
        fetchedOwner.customer.filter((cust) => cust.toString() !== customerId.toString());
        await fetchedOwner.save();
        FirebaseServices_1.default.deleteImageFromStorage(customer.profilePicture);
        await customer.deleteOne();
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
        const customerId = req.params.customerId;
        if (!customerId)
            (0, throwBadRequestError_1.default)("Customer not found.");
        const fetchedCustomer = await Customer_1.default.findById(customerId)
            .populate("calendarAcv")
            .populate({
            path: "coachPT",
            select: "name email phone profilePicture position",
        });
        if (!fetchedCustomer) {
            return (0, throwBadRequestError_1.default)("Customer not found.");
        }
        const fetchedExersice = await Exercise_1.default.find({
            name: fetchedCustomer.exercisePlan,
        });
        fetchedCustomer.exercisePlan = fetchedExersice;
        res.status(200).json({
            message: "Fetched customer successfully!",
            customer: fetchedCustomer,
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
    const { customerId, exerciseName } = req.body;
    if (!customerId)
        (0, throwBadRequestError_1.default)("Customer not found.");
    try {
        const fetchedCustomer = await Customer_1.default.findById(customerId);
        if (!fetchedCustomer) {
            return (0, throwBadRequestError_1.default)("Customer not found.");
        }
        const deleteExersice = fetchedCustomer.exercisePlan.filter((exersice) => exersice !== exerciseName);
        fetchedCustomer.exercisePlan = deleteExersice;
        const updatedCustomer = await fetchedCustomer.save();
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
    const { customerId, exerciseName } = req.body;
    if (!customerId)
        (0, throwBadRequestError_1.default)("Customer not found.");
    try {
        const fetchedCustomer = await Customer_1.default.findById(customerId);
        if (!fetchedCustomer) {
            return (0, throwBadRequestError_1.default)("Customer not found.");
        }
        const newExercises = exerciseName.filter((exercise) => {
            return typeof exercise === "string"
                ? fetchedCustomer.exercisePlan.includes(exercise)
                : undefined;
        });
        fetchedCustomer.exercisePlan = [
            ...fetchedCustomer.exercisePlan,
            ...newExercises,
        ];
        await fetchedCustomer.save();
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
    const { date, planText, planType, customerId, color } = req.body;
    if (!customerId)
        (0, throwBadRequestError_1.default)("Customer not found.");
    const fetchedCustomer = await Customer_1.default.findById(customerId);
    if (!fetchedCustomer) {
        return (0, throwBadRequestError_1.default)("Customer not found.");
    }
    const newActivityLog = new CalenderAcv_1.default({
        date: date,
        text: planText,
        type: planType,
        customerId: customerId,
        color: color,
    });
    const savedActivity = await newActivityLog.save();
    fetchedCustomer.calendarAcv.push(savedActivity._id);
    await fetchedCustomer.save();
    res.status(201).json({
        message: "Customer activity added successfully!",
        activity: savedActivity,
        status: 201,
    });
};
exports.addCustomerActivity = addCustomerActivity;
const deleteCustomerCoach = async (req, res, next) => {
    const { customerId } = req.body;
    if (!customerId)
        (0, throwBadRequestError_1.default)("Customer not found.");
    try {
        const fetchedCustomer = await Customer_1.default.findById(customerId);
        if (!fetchedCustomer) {
            return (0, throwBadRequestError_1.default)("Customer not found.");
        }
        const fetchedEmployee = await Employees_1.default.findById(fetchedCustomer.coachPT);
        if (!fetchedEmployee) {
            return (0, throwBadRequestError_1.default)("Employee not found.");
        }
        fetchedEmployee.customers.filter((cust) => cust.toString() !== customerId.toString());
        await fetchedEmployee.save();
        fetchedCustomer.coachPT = null;
        await fetchedCustomer.save();
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
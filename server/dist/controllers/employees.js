"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.assignCustomer = exports.getEmployees = exports.createEmployee = void 0;
const Employees_1 = __importDefault(require("../models/Employees"));
const Customer_1 = __importDefault(require("../models/Customer"));
const Owner_1 = __importDefault(require("../models/Owner"));
const throwValidationError_1 = __importDefault(require("../utils/err/throwValidationError"));
const throwBadRequestError_1 = __importDefault(require("../utils/err/throwBadRequestError"));
const throwNotFoundError_1 = __importDefault(require("../utils/err/throwNotFoundError"));
const calculateEmployessIncares_1 = require("../services/businessLogic/calculateEmployessIncares");
const FirebaseServices_1 = __importDefault(require("../utils/FirebaseServices"));
const createEmployee = async (req, res, next) => {
    if (!req.files) {
        return (0, throwValidationError_1.default)("Profile picture is required");
    }
    const profilePicture = req.files
        .filter((file) => {
        if (file.fieldname === "profilePicture") {
            return file.originalname;
        }
    })
        .map((file) => file.originalname) +
        "-" +
        Date.now();
    const documents = req.files
        .filter((file) => {
        if (file.fieldname === "documents") {
            return file.originalname;
        }
    })
        .map((file) => file.originalname);
    const downloadURLProfilePicture = await FirebaseServices_1.default.uploadImageToStorage(req.files[0], "employees/");
    let dowlandsDocuments = [];
    if (req.files.length > 1) {
        dowlandsDocuments = await Promise.all(req.files
            .filter((file) => {
            if (file.fieldname === "documents") {
                return file.originalname;
            }
        })
            .map(async (file) => {
            return await FirebaseServices_1.default.uploadImageToStorage(file, "empDocument/");
        }));
    }
    const ownerId = req.body.ownerId;
    const employee = new Employees_1.default({
        ...req.body,
        profilePicture: downloadURLProfilePicture,
        documents: dowlandsDocuments,
        customers: [],
    });
    try {
        const savedEmployee = await employee.save();
        const owner = await Owner_1.default.findById(ownerId);
        if (!owner) {
            return (0, throwNotFoundError_1.default)("Owner not found");
        }
        owner.employees.push(savedEmployee._id);
        await owner.save();
        res
            .status(201)
            .json({ message: "Employee created successfully", savedEmployee });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createEmployee = createEmployee;
const getEmployees = async (req, res, next) => {
    const ownerId = req.userId;
    try {
        const employees = await Employees_1.default.find({ ownerId: ownerId }).populate({
            path: "customers",
            select: "name email phone profilePicture",
        });
        if (!employees) {
            (0, throwNotFoundError_1.default)("Employees not found");
        }
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
    const { employeeId, customerId } = req.body;
    try {
        const employee = await Employees_1.default.findById(employeeId);
        const customer = await Customer_1.default.findById(customerId);
        if (!employee) {
            return (0, throwNotFoundError_1.default)("Employee not found");
        }
        if (!customer) {
            return (0, throwNotFoundError_1.default)("Customer not found");
        }
        if (!employee.customers) {
            employee.customers = [];
        }
        if (employee.customers.includes(customerId)) {
            (0, throwValidationError_1.default)("Customer already assigned to this employee");
        }
        employee.customers.push(customerId);
        await employee.save();
        customer.coachPT = employeeId;
        await customer.save();
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
        if (!req.body.id) {
            (0, throwBadRequestError_1.default)("Employee id is required");
        }
        const employeeId = req.body.id;
        const fetchedEmployee = await Employees_1.default.findByIdAndUpdate(employeeId, req.body);
        if (!fetchedEmployee) {
            (0, throwNotFoundError_1.default)("Employee not found");
        }
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
    const employeeId = req.params.employeeId;
    try {
        const employee = await Employees_1.default.findById(employeeId);
        if (!employee) {
            return (0, throwNotFoundError_1.default)("Employee not found");
        }
        if (employee.customers.length > 0) {
            const customers = await Customer_1.default.find({ coachPT: employeeId });
            if (!customers) {
                (0, throwNotFoundError_1.default)("Customers not found");
            }
            customers.forEach(async (customer) => {
                customer.coachPT = null;
                await customer.save();
            });
        }
        if (employee.profilePicture) {
            FirebaseServices_1.default.deleteImageFromStorage(employee.profilePicture);
        }
        employee.documents.forEach((document) => {
            FirebaseServices_1.default.deleteImageFromStorage(document);
        });
        await Employees_1.default.findByIdAndDelete(employeeId);
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
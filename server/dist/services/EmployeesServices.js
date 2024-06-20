"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesServices = void 0;
const EmployeeRepository_1 = require("../repository/EmployeeRepository");
const throwValidationError_1 = __importDefault(require("../utils/err/throwValidationError"));
const FirebaseServices_1 = __importDefault(require("../utils/FirebaseServices"));
const OwnerRepository_1 = require("../repository/OwnerRepository");
const throwNotFoundError_1 = __importDefault(require("../utils/err/throwNotFoundError"));
const CustomerRepository_1 = require("../repository/CustomerRepository");
class EmployeesServices {
    constructor() {
        this.employeeRepository = new EmployeeRepository_1.EmployeeRepository();
        this.ownerRepository = new OwnerRepository_1.OwnerRepository();
        this.customerRepository = new CustomerRepository_1.CustomerRepository();
    }
    /**
     * Creates a new employee.
     * @param req - The request object containing employee data.
     * @returns A promise that resolves to the created employee.
     * @throws An error if there is any issue during the creation process.
     */
    async createEmployee(req) {
        try {
            if (!req.files)
                return (0, throwValidationError_1.default)("Profile picture is required");
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
            const employee = await this.employeeRepository.create({
                ...req.body,
                profilePicture: downloadURLProfilePicture,
                documents: dowlandsDocuments,
                customers: [],
            });
            const fetchedOwner = await this.ownerRepository.findById(req.body.ownerId);
            if (!fetchedOwner)
                return (0, throwNotFoundError_1.default)("Owner not found");
            fetchedOwner.employees.push(employee._id);
            await this.ownerRepository.update(fetchedOwner._id, fetchedOwner);
            return employee;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    /**
     * Retrieves the employees associated with the specified owner.
     * @param ownerId - The ID of the owner.
     * @returns A promise that resolves to an array of employees.
     * @throws If an error occurs while retrieving the employees.
     */
    async getEmployees(ownerId) {
        try {
            const fetchedEmployee = await this.employeeRepository.find({
                ownerId: ownerId,
            });
            return Promise.all(fetchedEmployee.map(async (employee) => {
                return await employee.populate("customers", "name email phone profilePicture");
            }));
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async assignCustomer(req) {
        try {
            const employee = await this.employeeRepository.findById(req.body.employeeId);
            if (!employee)
                return (0, throwNotFoundError_1.default)("Employee not found");
            const customer = await this.customerRepository.findById(req.body.customerId);
            if (!customer)
                return (0, throwNotFoundError_1.default)("Customer not found");
            if (!employee.customers) {
                employee.customers = [];
            }
            if (employee.customers.includes(req.body.customerId)) {
                return (0, throwValidationError_1.default)("Customer already assigned to this employee");
            }
            employee.customers.push(req.body.customerId);
            await this.employeeRepository.update(employee._id, employee);
            await this.customerRepository.update(customer._id, {
                coachPT: employee._id,
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateEmployee(req) {
        try {
            if (!req.body.id)
                return (0, throwValidationError_1.default)("Employee id is required");
            const fetchedEmployee = await this.employeeRepository.update(req.body.id, req.body);
            if (!fetchedEmployee)
                return (0, throwNotFoundError_1.default)("Employee not found");
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteEmployee(req) {
        try {
            const employee = await this.employeeRepository.findById(req.params.employeeId);
            if (!employee)
                return (0, throwNotFoundError_1.default)("Employee not found");
            if (employee.customers.length > 0) {
                const customers = await this.customerRepository.find({
                    coachPT: employee._id,
                });
                if (!customers)
                    return (0, throwNotFoundError_1.default)("Customers not found");
                customers.forEach(async (customer) => {
                    await this.customerRepository.update(customer._id, {
                        coachPT: null,
                    });
                });
            }
            if (employee.profilePicture) {
                FirebaseServices_1.default.deleteImageFromStorage(employee.profilePicture);
            }
            employee.documents.forEach((document) => {
                FirebaseServices_1.default.deleteImageFromStorage(document);
            });
            await this.employeeRepository.delete(employee._id);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.EmployeesServices = EmployeesServices;
//# sourceMappingURL=EmployeesServices.js.map
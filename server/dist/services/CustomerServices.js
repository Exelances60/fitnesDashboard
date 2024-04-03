"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServices = void 0;
const OwnerRepository_1 = require("../repository/OwnerRepository");
const FirebaseServices_1 = __importDefault(require("../utils/FirebaseServices"));
const CustomerRepository_1 = require("../repository/CustomerRepository");
const ExersiceRepository_1 = require("../repository/ExersiceRepository");
const throwNotFoundError_1 = __importDefault(require("../utils/err/throwNotFoundError"));
const throwBadRequestError_1 = __importDefault(require("../utils/err/throwBadRequestError"));
const CalendarActRepository_1 = require("../repository/CalendarActRepository");
const EmployeeRepository_1 = require("../repository/EmployeeRepository");
class CustomerServices {
    constructor() {
        this.customerRepository = new CustomerRepository_1.CustomerRepository();
        this.ownerRepository = new OwnerRepository_1.OwnerRepository();
        this.exerciseRepository = new ExersiceRepository_1.ExerciseRepository();
        this.calendarAcvRepository = new CalendarActRepository_1.CalendarActRepository();
        this.employeeRepository = new EmployeeRepository_1.EmployeeRepository();
    }
    /**
     * Retrieves a customer by their ID.
     * @param _id - The ID of the customer to retrieve.
     * @returns A Promise that resolves to the customer object if found, or throws an error if not found.
     */
    async getCustomer(_id) {
        try {
            const customer = await this.customerRepository.findOwnerIdWithPopulate(_id, "coachPT", "name email phone profilePicture");
            if (!customer)
                return (0, throwNotFoundError_1.default)("Customer not found");
            return customer;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Adds a new customer.
     * @param req - The request object containing the customer data.
     * @returns The saved customer object.
     * @throws Error if there is an error while adding the customer.
     */
    async addCustomer(req) {
        try {
            const { coach, ownerId } = req.body;
            const fetchedOwner = (await this.ownerRepository.findById(ownerId));
            if (!fetchedOwner)
                return (0, throwNotFoundError_1.default)("Owner not found");
            const downloadURL = await FirebaseServices_1.default.uploadImageToStorage(req.file, "customers/");
            const savedCustomer = await this.customerRepository.create({
                ...req.body,
                coachPT: coach || null,
                age: +req.body.age,
                bodyWeight: +req.body.bodyWeight,
                height: +req.body.height,
                membershipPrice: +req.body.membershipPrice,
                membershipStartDate: new Date(),
                membershipEndDate: new Date(new Date().setMonth(new Date().getMonth() + +req.body.membershipMonths)),
                membershipType: +req.body.membershipMonths,
                exercisePlan: [],
                profilePicture: downloadURL,
                parentPhone: req.body.parentPhone ? req.body.parentPhone : null,
            });
            fetchedOwner.customer.push(savedCustomer._id);
            return savedCustomer;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Updates a customer based on the provided request.
     * @param req - The request object containing the necessary data for updating the customer.
     * @returns The updated customer object.
     * @throws Error if any error occurs during the update process.
     */
    async updateCustomer(req) {
        try {
            const fetchedOwner = await this.ownerRepository.findById(req.body.ownerId);
            if (!fetchedOwner)
                return (0, throwNotFoundError_1.default)("Owner not found");
            if (!fetchedOwner.customer.includes(req.body._id))
                return (0, throwBadRequestError_1.default)("Customer not found in owner's list");
            const customer = await this.customerRepository.findById(req.body._id);
            if (!customer)
                return (0, throwNotFoundError_1.default)("Customer not found");
            const updatedCustomer = await this.customerRepository.update(req.body._id, {
                ...req.body,
                membershipType: +req.body.membershipMonths,
            });
            return updatedCustomer;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Deletes a customer from the database.
     * @param customerId - The ID of the customer to delete.
     * @throws Error if the customer or owner is not found, or if there is an error during the deletion process.
     */
    async deleteCustomer(customerId) {
        try {
            const customer = await this.customerRepository.findById(customerId);
            if (!customer) {
                throw new Error("Customer not found");
            }
            const ownerId = customer.ownerId.toString();
            const fetchedOwner = await this.ownerRepository.findById(ownerId);
            if (!fetchedOwner) {
                throw new Error("Owner not found");
            }
            fetchedOwner.customer.filter((cust) => cust.toString() !== customerId.toString());
            await fetchedOwner.save();
            FirebaseServices_1.default.deleteImageFromStorage(customer.profilePicture);
            await customer.deleteOne();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Finds a customer by their ID and retrieves their information along with related exercise details.
     * @param customerId - The ID of the customer to find.
     * @returns The customer information along with their exercise details.
     * @throws Error if there is an error during the process.
     */
    async findCustomer(customerId) {
        try {
            const fetchedCustomer = await this.customerRepository.findById(customerId);
            if (!fetchedCustomer)
                return (0, throwNotFoundError_1.default)("Customer not found");
            await fetchedCustomer.populate("calendarAcv", "date text type color _id");
            await fetchedCustomer.populate("coachPT", "name email phone profilePicture position");
            const fetchedExersice = await this.exerciseRepository.find({
                name: fetchedCustomer.exercisePlan,
            });
            if (!fetchedExersice)
                return (0, throwNotFoundError_1.default)("Exercise not found");
            const exerciseNames = fetchedExersice.map((exercise) => {
                return {
                    bodyPart: exercise.bodyPart,
                    equipment: exercise.equipment,
                    gifUrl: exercise.gifUrl,
                    name: exercise.name,
                    secondaryMuscle: exercise.secondaryMuscle,
                    instructions: exercise.instructions,
                };
            });
            const responseCustomer = {
                _id: fetchedCustomer._id,
                age: fetchedCustomer.age,
                bodyWeight: fetchedCustomer.bodyWeight,
                height: fetchedCustomer.height,
                membershipPrice: fetchedCustomer.membershipPrice,
                membershipStartDate: fetchedCustomer.membershipStartDate,
                membershipEndDate: fetchedCustomer.membershipEndDate,
                membershipType: fetchedCustomer.membershipType,
                exercisePlan: exerciseNames,
                profilePicture: fetchedCustomer.profilePicture,
                parentPhone: fetchedCustomer.parentPhone,
                coachPT: fetchedCustomer.coachPT,
                calendarAcv: fetchedCustomer.calendarAcv,
                membershipStatus: fetchedCustomer.membershipStatus,
                name: fetchedCustomer.name,
                phone: fetchedCustomer.phone,
                email: fetchedCustomer.email,
                address: fetchedCustomer.address,
                bloodGroup: fetchedCustomer.bloodGroup,
            };
            return responseCustomer;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Deletes an exercise plan from a customer's list of exercise plans.
     * @param req - The request object containing the customer ID and exercise name.
     * @throws {BadRequestError} If the customer ID is not found in the request body.
     * @throws {NotFoundError} If the customer is not found in the database.
     * @throws {Error} If any other error occurs during the deletion process.
     */
    async deleteCustomerExercisePlan(req) {
        try {
            if (!req.body.customerId)
                return (0, throwBadRequestError_1.default)("Customer id not found");
            const fetchedCustomer = await this.customerRepository.findById(req.body.customerId);
            if (!fetchedCustomer)
                return (0, throwNotFoundError_1.default)("Customer not found");
            const deleteExersice = fetchedCustomer.exercisePlan.filter((exersice) => exersice !== req.body.exerciseName);
            fetchedCustomer.exercisePlan = deleteExersice;
            await fetchedCustomer.updateOne(fetchedCustomer);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Updates the exercise plan for a customer.
     * @param req - The request object containing the customer ID and new exercise plan.
     * @throws Error if there is an error updating the customer's exercise plan.
     */
    async updateCustomerExercisePlan(req) {
        try {
            const fetchedCustomer = await this.customerRepository.findById(req.body.customerId);
            if (!fetchedCustomer)
                return (0, throwNotFoundError_1.default)("Customer not found");
            const newExercises = req.body.exerciseName.filter((exercise) => {
                return typeof exercise === "string"
                    ? !fetchedCustomer.exercisePlan.includes(exercise)
                    : undefined;
            });
            fetchedCustomer.exercisePlan = [
                ...fetchedCustomer.exercisePlan,
                ...newExercises,
            ];
            await fetchedCustomer.updateOne(fetchedCustomer);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Adds a customer activity.
     * @param req - The request object containing the activity details.
     * @returns A promise that resolves to the created customer activity.
     * @throws An error if there is an issue adding the customer activity.
     */
    async addCustomerActivity(req) {
        try {
            const { planText, planType, customerId } = req.body;
            const fetchedCustomer = await this.customerRepository.findById(customerId);
            if (!fetchedCustomer)
                return (0, throwNotFoundError_1.default)("Customer not found");
            const savedActivity = await this.calendarAcvRepository.create({
                planText,
                planType,
                customerId,
                ...req.body,
            });
            fetchedCustomer.calendarAcv.push(savedActivity._id);
            await fetchedCustomer.updateOne(fetchedCustomer);
            return savedActivity;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Deletes a customer's coach and updates the corresponding records.
     * @param customerId - The ID of the customer to delete the coach for.
     * @returns A promise that resolves to undefined.
     * @throws Error if there is an error during the deletion process.
     */
    async deleteCustomerCoach(customerId) {
        try {
            const fetchedCustomer = await this.customerRepository.findById(customerId);
            if (!fetchedCustomer)
                return (0, throwNotFoundError_1.default)("Customer not found");
            if (!fetchedCustomer.coachPT)
                return (0, throwBadRequestError_1.default)("Customer does not have a coach");
            const fetchedEmployee = await this.employeeRepository.findById(fetchedCustomer.coachPT.toString());
            if (!fetchedEmployee)
                return (0, throwNotFoundError_1.default)("Employee not found");
            fetchedEmployee.customers.filter((cust) => cust.toString() !== customerId.toString());
            await fetchedEmployee.updateOne(fetchedEmployee);
            fetchedCustomer.coachPT = null;
            await fetchedCustomer.updateOne(fetchedCustomer);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.CustomerServices = CustomerServices;
//# sourceMappingURL=CustomerServices.js.map
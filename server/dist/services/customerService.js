"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_1 = __importDefault(require("../models/Customer"));
class CustomerServices {
    async getCustomerByOwnerId(id) {
        try {
            const fetchedCustomer = await Customer_1.default.find({ ownerId: id }).populate({
                path: "coachPT",
                select: "name email phone profilePicture",
            });
            if (!fetchedCustomer) {
                throw new Error("Customer not found.");
            }
            return fetchedCustomer;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
const customerServices = new CustomerServices();
exports.default = customerServices;
//# sourceMappingURL=customerService.js.map
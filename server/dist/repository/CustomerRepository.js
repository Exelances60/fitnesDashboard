"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const Repository_1 = __importDefault(require("./Repository"));
const Customer_1 = __importDefault(require("../models/Customer"));
class CustomerRepository extends Repository_1.default {
    constructor() {
        super(Customer_1.default);
    }
    async findOwnerIdWithPopulate(id) {
        try {
            const result = await Customer_1.default.find({ ownerId: id }).populate({
                path: "coachPT",
                select: "name email phone profilePicture",
            });
            if (!result) {
                throw new Error("Not found");
            }
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findByIdWithDoublePopulate(id, populateModel1, populateField1, populateModel2, populateField2) {
        try {
            const result = await Customer_1.default.findById(id)
                .populate({
                path: populateModel1,
                select: populateField1,
            })
                .populate({
                path: populateModel2,
                select: populateField2,
            });
            if (!result) {
                throw new Error("Not found");
            }
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=CustomerRepository.js.map
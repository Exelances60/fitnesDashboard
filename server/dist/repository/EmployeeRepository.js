"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRepository = void 0;
const Employees_1 = __importDefault(require("../models/Employees"));
const Repository_1 = __importDefault(require("./Repository"));
class EmployeeRepository extends Repository_1.default {
    constructor() {
        super(Employees_1.default);
    }
}
exports.EmployeeRepository = EmployeeRepository;
//# sourceMappingURL=EmployeeRepository.js.map
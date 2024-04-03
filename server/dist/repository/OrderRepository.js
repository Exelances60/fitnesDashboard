"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Repository_1 = __importDefault(require("./Repository"));
class OrderRepository extends Repository_1.default {
    constructor() {
        super(Order_1.default);
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=OrderRepository.js.map
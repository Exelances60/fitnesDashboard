"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleJobs = void 0;
const Owner_1 = __importDefault(require("../models/Owner"));
const Order_1 = __importDefault(require("../models/Order"));
const scheduleJobs = async () => {
    const owners = await Owner_1.default.find();
    const orders = await Order_1.default.find();
    owners.forEach((owner) => {
        const ownerOrders = orders
            .filter((order) => order.creator.toString() === owner._id.toString())
            .map((order) => order._id);
        owner.orders = ownerOrders;
        owner.save();
        console.log("Orders added to owner");
    });
};
exports.scheduleJobs = scheduleJobs;
//# sourceMappingURL=scheduleJobs.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const orderController = __importStar(require("../controllers/order"));
const isAuth_1 = require("../middleware/isAuth");
const node_schedule_1 = require("node-schedule");
const scheduleJobs_1 = require("../controllers/scheduleJobs");
const router = (0, express_1.Router)();
const sendInformantion = (0, node_schedule_1.scheduleJob)("0 0 * * *", scheduleJobs_1.scheduleJobs);
router.post("/create-order", [
    (0, express_validator_1.body)("price").isNumeric(),
    (0, express_validator_1.body)("amount").isNumeric(),
    (0, express_validator_1.body)("email").isEmail().trim(),
    (0, express_validator_1.body)("address").isLength({ min: 10 }),
    (0, express_validator_1.body)("phone").isLength({ min: 10 }),
], isAuth_1.isAuth, orderController.createOrder);
router.get("/get-orders", isAuth_1.isAuth, orderController.getOrders);
router.put("/update-order", isAuth_1.isAuth, orderController.updateOrder);
router.post("/ordercompleted", isAuth_1.isAuth, orderController.orderCompleted);
exports.default = router;
//# sourceMappingURL=order.js.map
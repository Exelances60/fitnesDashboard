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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const customerController = __importStar(require("../controllers/customer"));
const multer_1 = __importDefault(require("multer"));
const MulterFileFilter_1 = require("../utils/MulterFileFilter");
const Customer_1 = require("../Validator/Customer");
const router = (0, express_1.Router)();
exports.customerRoutes = router;
router.post("/add-customer", isAuth_1.isAuth, (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), fileFilter: MulterFileFilter_1.fileFilter }).single("profilePicture"), Customer_1.addCustomerValidator, customerController.addCustomer);
router.get("/get-customer", isAuth_1.isAuth, customerController.getCustomer);
router.put("/update-customer", isAuth_1.isAuth, Customer_1.customerUpdateValidator, customerController.updateCustomer);
router.delete("/delete-customer/:customerId", isAuth_1.isAuth, customerController.deleteCustomer);
router.get("/findcustomer/:customerId", isAuth_1.isAuth, customerController.findCustomer);
router.put("/delete-customer-exercise-plan", isAuth_1.isAuth, customerController.deleteCustomerExercisePlan);
router.put("/update-customer-plan", isAuth_1.isAuth, customerController.updateCustomerPlan);
router.post("/add-customer-activity", isAuth_1.isAuth, customerController.addCustomerActivity);
router.delete("/remove-customer-coach", isAuth_1.isAuth, customerController.deleteCustomerCoach);
//# sourceMappingURL=customer.js.map
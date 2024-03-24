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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController = __importStar(require("../controllers/auth"));
const isAuth_1 = require("../middleware/isAuth");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/webp") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Please enter a valid email address."),
    (0, express_validator_1.body)("password").trim().isLength({ min: 5 }),
], authController.login);
router.post("/signup", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Please enter a valid email address."),
    (0, express_validator_1.body)("password").trim().isLength({ min: 5 }),
    (0, express_validator_1.body)("companyName").trim().not().isEmpty(),
], authController.signup);
router.get("/ownerInfo", isAuth_1.isAuth, authController.getOwnerInfo);
router.put("/update-owner", isAuth_1.isAuth, [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail(),
    (0, express_validator_1.body)("phone")
        .matches(/^[0-9]{10}$/)
        .withMessage("Please enter a valid phone number.")
        .trim(),
    (0, express_validator_1.body)("memberShipPrice").isInt().withMessage("Please enter a valid price."),
], authController.updateOwner);
router.put("/uploadOwnerImage", isAuth_1.isAuth, (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), fileFilter: fileFilter }).single("ownerImage"), authController.uploadOwnerImage);
exports.default = router;
//# sourceMappingURL=auth.js.map
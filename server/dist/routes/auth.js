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
exports.authRoutes = void 0;
const express_1 = require("express");
const authController = __importStar(require("../controllers/auth"));
const isAuth_1 = require("../middleware/isAuth");
const multer_1 = __importDefault(require("multer"));
const MulterFileFilter_1 = require("../utils/MulterFileFilter");
const AuthValidate_1 = require("../Validator/AuthValidate");
const router = (0, express_1.Router)();
exports.authRoutes = router;
router.post("/login", AuthValidate_1.loginValidator, authController.login);
router.get("/ownerInfo", isAuth_1.isAuth, authController.getOwnerInfo);
router.put("/update-owner", isAuth_1.isAuth, AuthValidate_1.updateOwnerValidator, authController.updateOwner);
router.put("/uploadOwnerImage", isAuth_1.isAuth, (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), fileFilter: MulterFileFilter_1.fileFilter }).single("ownerImage"), authController.uploadOwnerImage);
router.post("/signup", (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), fileFilter: MulterFileFilter_1.fileFilter }).single("ownerImage"), authController.signup);
router.post("/verify", authController.verifyToken);
//# sourceMappingURL=auth.js.map
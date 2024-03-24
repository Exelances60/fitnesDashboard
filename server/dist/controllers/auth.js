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
exports.uploadOwnerImage = exports.updateOwner = exports.getOwnerInfo = exports.signup = exports.login = void 0;
const Owner_1 = __importDefault(require("../models/Owner"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "/.env" });
const express_validator_1 = require("express-validator");
const throwNotFoundError_1 = __importDefault(require("../utils/err/throwNotFoundError"));
const throwValidationError_1 = __importDefault(require("../utils/err/throwValidationError"));
const jwtServices_1 = __importDefault(require("../services/jwtServices"));
const userService_1 = __importDefault(require("../services/userService"));
const FirebaseServices_1 = __importDefault(require("../services/FirebaseServices"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new Error("Validation failed, entered data is incorrect.");
        }
        const { email, password } = req.body;
        const owner = await Owner_1.default.findOne({ email });
        if (!owner) {
            throw new Error("A owner with this email could not be found.");
        }
        const isPasswordMatch = await jwtServices_1.default.comparePassword(password, owner.password);
        if (!isPasswordMatch) {
            throw new Error("Wrong password!");
        }
        const token = jwtServices_1.default.signToken({
            email: owner.email,
            ownerId: owner._id.toString(),
            _id: owner._id.toString(),
        });
        res.status(200).json({
            token,
            ownerId: owner._id.toString(),
            message: "Login successful!",
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500; // Set default status code if not provided
        }
        next(err); // Pass the error to the error handling middleware
    }
};
exports.login = login;
const signup = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, throwValidationError_1.default)("Validation failed, entered data is incorrect.");
    }
    const { email, password } = req.body;
    bcryptjs_1.default
        .hash(password, 12)
        .then((hashedPw) => {
        const owner = new Owner_1.default({
            email,
            password: hashedPw,
            companyName: "test",
            address: "test",
            phone: "1234567890",
        });
        return owner.save();
    })
        .then((result) => {
        res.status(201).json({ message: "Owner created!", ownerId: result._id });
    })
        .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.signup = signup;
const getOwnerInfo = async (req, res, next) => {
    const ownerId = req.userId;
    try {
        const owner = await Owner_1.default.findById(ownerId).select("email companyName address phone ownerImage productCategory memberShipList memberShipPrice memberShipMonths");
        if (!owner) {
            (0, throwNotFoundError_1.default)("Could not find owner.");
        }
        res.status(200).json({ message: "Owner fetched.", owner: owner });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getOwnerInfo = getOwnerInfo;
const updateOwner = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, throwValidationError_1.default)("Validation failed, entered data is incorrect.");
    }
    if (!req.userId)
        return;
    const ownerId = req.userId;
    try {
        const fetchedOwner = await userService_1.default.findByIdUpdate(ownerId, req.body, Owner_1.default);
        if (!fetchedOwner) {
            (0, throwNotFoundError_1.default)("Could not find owner.");
        }
        res.status(200).json({ message: "Owner updated!", owner: fetchedOwner });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.updateOwner = updateOwner;
const uploadOwnerImage = async (req, res, next) => {
    try {
        if (!req.file) {
            (0, throwValidationError_1.default)("No image provided.");
        }
        const ownerId = req.userId;
        if (!req.file)
            return;
        const dowlandURLOwnerImage = await FirebaseServices_1.default.uploadImageToStorage(req.file, "owner/");
        const owner = await Owner_1.default.findById(ownerId);
        if (!owner) {
            return (0, throwNotFoundError_1.default)("Could not find owner.");
        }
        if (owner && owner.ownerImage) {
            await FirebaseServices_1.default.deleteImageFromStorage(owner.ownerImage);
        }
        owner.ownerImage = dowlandURLOwnerImage;
        await owner.save();
        res.status(201).json({
            message: "Owner Image uploaded.",
            ownerImage: owner.ownerImage,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.uploadOwnerImage = uploadOwnerImage;
//# sourceMappingURL=auth.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOwnerImage = exports.updateOwner = exports.getOwnerInfo = exports.signup = exports.login = void 0;
const Owner_1 = __importDefault(require("../models/Owner"));
require("dotenv/config");
const express_validator_1 = require("express-validator");
const throwValidationError_1 = __importDefault(require("../utils/err/throwValidationError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const printValidatorErrors_1 = require("../utils/printValidatorErrors");
const userService_1 = require("../services/userService");
const login = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        (0, printValidatorErrors_1.printValidatorErrors)(errors);
        const token = await new userService_1.UserServices().Login(req.body.email, req.body.password);
        res.status(200).json({
            token,
            message: "Login successful!",
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.login = login;
const signup = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        (0, printValidatorErrors_1.printValidatorErrors)(errors);
        const { email, password } = req.body;
        const hashedPw = await bcryptjs_1.default.hash(password, 12);
        const owner = new Owner_1.default({
            email,
            password: hashedPw,
            companyName: "test",
            address: "test",
            phone: "1234567890",
        });
        const result = await owner.save();
        res.status(201).json({ message: "Owner created!", ownerId: result._id });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.signup = signup;
const getOwnerInfo = async (req, res, next) => {
    try {
        if (!req.userId)
            return (0, throwValidationError_1.default)("No user id provided.");
        const owner = await new userService_1.UserServices().getOwnerInfo(req.userId);
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
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        (0, printValidatorErrors_1.printValidatorErrors)(errors);
        const fetchedOwner = await new userService_1.UserServices().updateOwnerInfo(req);
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
        const responseOwner = await new userService_1.UserServices().uploadOwnerImage(req);
        res.status(201).json({
            message: "Owner Image uploaded.",
            ownerImage: responseOwner.ownerImage,
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
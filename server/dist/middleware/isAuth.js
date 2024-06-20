"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
require("dotenv/config");
const jwtServices_1 = __importDefault(require("../utils/jwtServices"));
const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated.");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = jwtServices_1.default.verifyToken(token);
        if (!decodedToken) {
            const error = new Error("Not authenticated.");
            error.statusCode = 401;
            throw error;
        }
        req.userId = decodedToken.ownerId;
        next();
    }
    catch (error) {
        error.statusCode = 500;
        throw error;
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class JwtServices {
    constructor() {
        this.secret = process.env.JWT_SECRET;
    }
    async comparePassword(password, ownerPassword) {
        try {
            return await bcryptjs_1.default.compare(password, ownerPassword);
        }
        catch (error) {
            throw new Error("Could not compare passwords");
        }
    }
    signToken(payload) {
        try {
            return jsonwebtoken_1.default.sign(payload, this.secret, { expiresIn: "1h" });
        }
        catch (error) {
            throw new Error("Could not sign token");
        }
    }
}
const jwtServices = new JwtServices();
exports.default = jwtServices;
//# sourceMappingURL=jwtServices.js.map
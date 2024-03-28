"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
exports.default = async () => {
    try {
        await mongoose_1.default.connect(config_1.MONGODB_URI);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
//# sourceMappingURL=DatabaseServices.js.map
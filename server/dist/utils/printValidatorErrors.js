"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printValidatorErrors = void 0;
const throwValidationError_1 = __importDefault(require("./err/throwValidationError"));
const printValidatorErrors = (errors) => {
    if (!errors.isEmpty()) {
        return (0, throwValidationError_1.default)(`${errors
            .array()
            .map((err) => err.msg)
            .join(",")}`);
    }
};
exports.printValidatorErrors = printValidatorErrors;
//# sourceMappingURL=printValidatorErrors.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throwValidationError = (message) => {
    const error = new Error(message);
    error.statusCode = 422;
    throw error;
};
exports.default = throwValidationError;
//# sourceMappingURL=throwValidationError.js.map
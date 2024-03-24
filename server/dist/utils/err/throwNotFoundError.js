"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throwNotFoundError = (message) => {
    const error = new Error(message);
    error.statusCode = 404;
    throw error;
};
exports.default = throwNotFoundError;
//# sourceMappingURL=throwNotFoundError.js.map
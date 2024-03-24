"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throwBadRequestError = (message) => {
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
};
exports.default = throwBadRequestError;
//# sourceMappingURL=throwBadRequestError.js.map
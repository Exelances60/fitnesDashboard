"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTheValidationErrors = void 0;
const printTheValidationErrors = (requestValidation) => {
    return `Validation failed, entered data is incorrect. ${requestValidation.error.errors
        .map((error) => error.message)
        .join(", ")}`;
};
exports.printTheValidationErrors = printTheValidationErrors;
//# sourceMappingURL=PrintTheValidationErrors.js.map
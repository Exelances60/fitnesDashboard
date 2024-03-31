import { Result, ValidationError } from "express-validator";
import throwValidationError from "./err/throwValidationError";

export const printValidatorErrors = (errors: Result<ValidationError>) => {
  if (!errors.isEmpty()) {
    return throwValidationError(
      `${errors
        .array()
        .map((err) => err.msg)
        .join(",")}`
    );
  }
};

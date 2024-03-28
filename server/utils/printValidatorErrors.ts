import { Result, ValidationError } from "express-validator";

export const printValidatorErrors = (errors: Result<ValidationError>) => {
  if (!errors.isEmpty()) {
    throw new Error(
      `${errors
        .array()
        .map((err) => err.msg)
        .join(",")}`
    );
  }
};

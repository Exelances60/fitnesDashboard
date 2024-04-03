import { body } from "express-validator";

export const customeAgeValidator = (value: any) => {
  if (+value < 18) {
    throw new Error("Age must be greater than 18");
  } else if (+value > 80) {
    throw new Error("Age must be less than 60");
  }
  return true;
};

export const createEmployeesValidator = [
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Name less than 2")
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Email not valid")
    .notEmpty()
    .withMessage("Email is required"),
  body("phone")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Phone less than 10")
    .notEmpty(),
  body("age").custom(customeAgeValidator).isInt().notEmpty(),
  body("hireDate").notEmpty().withMessage("Hire date is required"),
  body("salary")
    .custom((value) => {
      const salary = parseInt(value);
      if (!salary) {
        throw new Error("Salary is required");
      }
      return true;
    })
    .notEmpty(),
  body("ownerId").notEmpty().withMessage("Owner is required").isString(),
];

export const assignCustomerValidator = [
  body("employeeId").notEmpty().withMessage("Employee is required").isString(),
  body("customerId").notEmpty().withMessage("Customer is required").isString(),
];

export const updateEmployeeValidator = [
  body("name").isLength({ min: 2 }).withMessage("Name less than 2").notEmpty(),
  body("email").isEmail().withMessage("Email not valid").notEmpty(),
  body("phone")
    .isLength({ min: 10 })
    .withMessage("Phone less than 10")
    .isInt()
    .notEmpty(),
  body("age").custom(customeAgeValidator).isInt().notEmpty(),
  body("hireDate").notEmpty().withMessage("Hire date is required"),
  body("salary").isInt().notEmpty().withMessage("Salary is required"),
];

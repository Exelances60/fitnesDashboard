import { Request, Response, NextFunction } from "express";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import { currentMonthEmployeesCountIncarese } from "../services/businessLogic/calculateEmployessIncares";
import { validationResult } from "express-validator";
import { printValidatorErrors } from "../utils/printValidatorErrors";
import { EmployeesServices } from "../services/EmployeesServices";

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    printValidatorErrors(errors);
    const savedEmployee = await new EmployeesServices().createEmployee(req);
    res.status(201).json({
      message: "Employee created successfully",
      savedEmployee,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerId = req.userId;

    if (!ownerId) return throwBadRequestError("Owner id is required");
    const employees = await new EmployeesServices().getEmployees(ownerId);
    const totalEmployeesCountIncarese =
      currentMonthEmployeesCountIncarese(employees);

    res.status(200).json({
      employees: employees,
      totalEmployeesCountIncarese,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const assignCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    printValidatorErrors(errors);
    await new EmployeesServices().assignCustomer(req);
    res.status(200).json({ message: "Customer assigned successfully" });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    printValidatorErrors(errors);
    await new EmployeesServices().updateEmployee(req);
    res.status(200).json({
      message: "Employee updated successfully",
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await new EmployeesServices().deleteEmployee(req);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

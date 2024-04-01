import { Request, Response, NextFunction } from "express";
import Employee, { IEmployee } from "../models/Employees";
import Customer from "../models/Customer";
import throwValidationError from "../utils/err/throwValidationError";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import { currentMonthEmployeesCountIncarese } from "../services/businessLogic/calculateEmployessIncares";
import firebaseStorageServices from "../utils/FirebaseServices";
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
    const { employeeId, customerId } = req.body;
    const employee = await Employee.findById(employeeId);
    const customer = await Customer.findById(customerId);
    if (!employee) {
      return throwNotFoundError("Employee not found");
    }
    if (!customer) {
      return throwNotFoundError("Customer not found");
    }

    if (!employee.customers) {
      employee.customers = [];
    }

    if (employee.customers.includes(customerId)) {
      throwValidationError("Customer already assigned to this employee");
    }
    employee.customers.push(customerId);
    await employee.save();
    customer.coachPT = employeeId;
    await customer.save();
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
    if (!req.body.id) {
      throwBadRequestError("Employee id is required");
    }
    const employeeId = req.body.id;
    const fetchedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      req.body
    );
    if (!fetchedEmployee) {
      throwNotFoundError("Employee not found");
    }

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
  const employeeId = req.params.employeeId;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return throwNotFoundError("Employee not found");
    }
    if (employee.customers.length > 0) {
      const customers = await Customer.find({ coachPT: employeeId });
      if (!customers) {
        throwNotFoundError("Customers not found");
      }
      customers.forEach(async (customer) => {
        customer.coachPT = null;
        await customer.save();
      });
    }
    if (employee.profilePicture) {
      firebaseStorageServices.deleteImageFromStorage(employee.profilePicture);
    }
    employee.documents.forEach((document) => {
      firebaseStorageServices.deleteImageFromStorage(document);
    });
    await Employee.findByIdAndDelete(employeeId);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

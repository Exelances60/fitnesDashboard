import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import throwValidationError from "../utils/err/throwValidationError";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import { CustomerServices } from "../services/customerService";

export const addCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwValidationError("Validation failed, entered data is incorrect.");
    }
    const responseCustomer = await new CustomerServices().addCustomer(req);
    res.status(201).json({
      message: "Customer created successfully!",
      customer: responseCustomer,
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerId = req.userId;
    if (!ownerId) return throwBadRequestError("Owner not found.");

    const customerService = new CustomerServices();
    const fetchedCustomer = await customerService.getCustomer(ownerId);
    res.status(200).json({
      message: "Fetched customer successfully!",
      customers: fetchedCustomer,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwValidationError("Validation failed, entered data is incorrect.");
    }
    const responseUpdateCustomer = await new CustomerServices().updateCustomer(
      req
    );
    res.status(200).json({
      message: "Customer updated successfully!",
      customer: responseUpdateCustomer,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.customerId) throwBadRequestError("Customer not found.");
    await new CustomerServices().deleteCustomer(req.params.customerId);
    res.status(200).json({
      message: "Customer deleted successfully!",
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const findCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseCustomer = await new CustomerServices().findCustomer(
      req.params.customerId
    );
    res.status(200).json({
      message: "Fetched customer successfully!",
      customer: responseCustomer,
      status: 200,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deleteCustomerExercisePlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedCustomer = new CustomerServices().deleteCustomerExercisePlan(
      req
    );
    res.status(200).json({
      message: "Customer exercise plan deleted successfully!",
      customer: updatedCustomer,
      status: 200,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const updateCustomerPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.customerId) throwBadRequestError("Customer not found.");
    await new CustomerServices().updateCustomerExercisePlan(req);
    res.status(200).json({
      message: "Customer exercise plan updated successfully!",
      status: 200,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const addCustomerActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.customerId) throwBadRequestError("Customer not found.");
    const savedActivity = await new CustomerServices().addCustomerActivity(req);
    res.status(201).json({
      message: "Customer activity added successfully!",
      activity: savedActivity,
      status: 201,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deleteCustomerCoach = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.customerId) throwBadRequestError("Customer not found.");
    await new CustomerServices().deleteCustomerCoach(req.body.customerId);
    res.status(200).json({
      message: "Customer coach deleted successfully!",
      status: 200,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

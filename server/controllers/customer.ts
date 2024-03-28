import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import throwValidationError from "../utils/err/throwValidationError";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import Owner from "../models/Owner";
import Customer from "../models/Customer";
import Exersice, { IExercise } from "../models/Exercise";
import CalenderAcv from "../models/CalenderAcv";
import Employee from "../models/Employees";
import firebaseStorageServices from "../utils/FirebaseServices";
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

    console.log(fetchedCustomer);
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }
  const { _id, ownerId } = req.body;
  try {
    const fetchedOwner = await Owner.findById(ownerId);
    if (!fetchedOwner) {
      return throwBadRequestError("Owner not found.");
    }
    if (!fetchedOwner.customer.includes(_id)) {
      return throwBadRequestError("Customer not found.");
    }
    let customer = await Customer.findById(_id);
    if (!customer) {
      return throwBadRequestError("Customer not found.");
    }

    customer = {
      ...req.body,
      membershipType: req.body.membershipMonths,
      membershipPrice: req.body.membershipPrice,
      membershipStatus: req.body.membershipStatus,
      exercisePlan: req.body.exercisePlan || customer.exercisePlan,
    };

    const updatedCustomer = await customer?.save();
    res.status(200).json({
      message: "Customer updated successfully!",
      customer: updatedCustomer,
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
  const customerId = req.params.customerId;
  if (!customerId) throwBadRequestError("Customer not found.");
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return throwBadRequestError("Customer not found.");
    }
    const ownerId = customer.ownerId;
    const fetchedOwner = await Owner.findById(ownerId);
    if (!fetchedOwner) {
      return throwBadRequestError("Owner not found.");
    }
    fetchedOwner.customer.filter(
      (cust) => cust.toString() !== customerId.toString()
    );
    await fetchedOwner.save();
    firebaseStorageServices.deleteImageFromStorage(customer.profilePicture);
    await customer.deleteOne();
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
    const customerId = req.params.customerId;
    if (!customerId) throwBadRequestError("Customer not found.");
    const fetchedCustomer = await Customer.findById(customerId)
      .populate("calendarAcv")
      .populate({
        path: "coachPT",
        select: "name email phone profilePicture position",
      });

    if (!fetchedCustomer) {
      return throwBadRequestError("Customer not found.");
    }

    const fetchedExersice = await Exersice.find({
      name: fetchedCustomer.exercisePlan,
    });
    fetchedCustomer.exercisePlan = fetchedExersice;

    res.status(200).json({
      message: "Fetched customer successfully!",
      customer: fetchedCustomer,
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
  const { customerId, exerciseName } = req.body;
  if (!customerId) throwBadRequestError("Customer not found.");
  try {
    const fetchedCustomer = await Customer.findById(customerId);
    if (!fetchedCustomer) {
      return throwBadRequestError("Customer not found.");
    }
    const deleteExersice = fetchedCustomer.exercisePlan.filter(
      (exersice) => exersice !== exerciseName
    ) as string[];

    fetchedCustomer.exercisePlan = deleteExersice;
    const updatedCustomer = await fetchedCustomer.save();
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
  const { customerId, exerciseName } = req.body;

  if (!customerId) throwBadRequestError("Customer not found.");
  try {
    const fetchedCustomer = await Customer.findById(customerId);
    if (!fetchedCustomer) {
      return throwBadRequestError("Customer not found.");
    }
    const newExercises = exerciseName.filter((exercise: IExercise) => {
      return typeof exercise === "string"
        ? fetchedCustomer.exercisePlan.includes(exercise)
        : undefined;
    });

    fetchedCustomer.exercisePlan = [
      ...fetchedCustomer.exercisePlan,
      ...newExercises,
    ];
    await fetchedCustomer.save();
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
  const { date, planText, planType, customerId, color } = req.body;
  if (!customerId) throwBadRequestError("Customer not found.");

  const fetchedCustomer = await Customer.findById(customerId);
  if (!fetchedCustomer) {
    return throwBadRequestError("Customer not found.");
  }

  const newActivityLog = new CalenderAcv({
    date: date,
    text: planText,
    type: planType,
    customerId: customerId,
    color: color,
  });
  const savedActivity = await newActivityLog.save();
  fetchedCustomer.calendarAcv.push(savedActivity._id);
  await fetchedCustomer.save();
  res.status(201).json({
    message: "Customer activity added successfully!",
    activity: savedActivity,
    status: 201,
  });
};

export const deleteCustomerCoach = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customerId } = req.body;
  if (!customerId) throwBadRequestError("Customer not found.");
  try {
    const fetchedCustomer = await Customer.findById(customerId);
    if (!fetchedCustomer) {
      return throwBadRequestError("Customer not found.");
    }
    const fetchedEmployee = await Employee.findById(fetchedCustomer.coachPT);
    if (!fetchedEmployee) {
      return throwBadRequestError("Employee not found.");
    }
    fetchedEmployee.customers.filter(
      (cust) => cust.toString() !== customerId.toString()
    );
    await fetchedEmployee.save();
    fetchedCustomer.coachPT = null;
    await fetchedCustomer.save();
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

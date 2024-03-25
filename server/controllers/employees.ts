import { Request, Response, NextFunction } from "express";
import Employee from "../models/Employees";
import Customer from "../models/Customer";
import Owner from "../models/Owner";
import throwValidationError from "../utils/err/throwValidationError";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import { currentMonthEmployeesCountIncarese } from "../services/businessLogic/calculateEmployessIncares";
import firebaseStorageServices from "../utils/FirebaseServices";

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) {
    return throwValidationError("Profile picture is required");
  }
  const profilePicture =
    req.files
      .filter((file) => {
        if (file.fieldname === "profilePicture") {
          return file.originalname;
        }
      })
      .map((file) => file.originalname) +
    "-" +
    Date.now();

  const documents = req.files
    .filter((file) => {
      if (file.fieldname === "documents") {
        return file.originalname;
      }
    })
    .map((file) => file.originalname);

  const downloadURLProfilePicture =
    await firebaseStorageServices.uploadImageToStorage(
      req.files[0],
      "employees/"
    );

  let dowlandsDocuments: string[] = [];
  if (req.files.length > 1) {
    dowlandsDocuments = await Promise.all(
      req.files
        .filter((file) => {
          if (file.fieldname === "documents") {
            return file.originalname;
          }
        })
        .map(async (file) => {
          return await firebaseStorageServices.uploadImageToStorage(
            file,
            "empDocument/"
          );
        })
    );
  }
  const ownerId = req.body.ownerId;
  const employee = new Employee({
    ...req.body,
    profilePicture: downloadURLProfilePicture,
    documents: dowlandsDocuments,
    customers: [],
  });
  try {
    const savedEmployee = await employee.save();
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return throwNotFoundError("Owner not found");
    }
    owner.employees.push(savedEmployee._id);
    await owner.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", savedEmployee });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ownerId = req.userId;
  try {
    const employees = await Employee.find({ ownerId: ownerId }).populate({
      path: "customers",
      select: "name email phone profilePicture",
    });

    if (!employees) {
      throwNotFoundError("Employees not found");
    }
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
  const { employeeId, customerId } = req.body;
  try {
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

const Employee = require("../models/Employees");
const Customer = require("../models/Customer");
const Owner = require("../models/owner");
const throwValidationError = require("../utils/err/throwValidationError");
const throwBadRequestError = require("../utils/err/throwBadRequestError");
const throwNotFoundError = require("../utils/err/throwNotFoundError");
const clearImage = require("../utils/clearImage");
const {
  currentMonthEmployeesSalary,
  currentMonthEmployeesCountIncarese,
} = require("../services/businessLogic/calculateEmployessIncares");

exports.createEmployee = async (req, res) => {
  const profilePicture = req.files
    .filter((file) => {
      if (file.fieldname === "profilePicture") {
        file.path.replace(/\\/g, "/");
        return file.path;
      }
    })
    .map((file) => file.path);

  const documents = req.files
    .filter((file) => {
      if (file.fieldname === "documents") {
        return file.path.replace(/\\/g, "/");
      }
    })
    .map((file) => file.path);

  const ownerId = req.body.ownerId;
  const employee = new Employee({
    ...req.body,
    profilePicture: profilePicture[0],
    documents: documents,
    customers: [],
  });
  try {
    const savedEmployee = await employee.save();
    const owner = await Owner.findById(ownerId);
    owner.employees.push(savedEmployee);
    await owner.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", savedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployees = async (req, res, next) => {
  const ownerId = req.params.ownerId;
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
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.assignCustomer = async (req, res, next) => {
  const { employeeId, customerId } = req.body;
  try {
    const employee = await Employee.findById(employeeId);
    const customer = await Customer.findById(customerId);
    if (!employee) {
      throwNotFoundError("Employee not found");
    }
    if (!employee) {
      throwNotFoundError("Employee not found");
    }
    if (employee.customers.includes(customerId)) {
      throwValidationError("Customer already assigned to this employee");
    }
    employee.customers.push(customerId);
    -(await employee.save());
    customer.coachPT = employeeId;
    await customer.save();
    res.status(200).json({ message: "Customer assigned successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
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
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const employeeId = req.params.employeeId;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throwNotFoundError("Employee not found");
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
    clearImage(employee.profilePicture);
    employee.documents.forEach((document) => {
      clearImage(document);
    });
    await Employee.findByIdAndDelete(employeeId);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

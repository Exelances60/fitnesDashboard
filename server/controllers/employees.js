const Employee = require("../models/Employees");
const Customer = require("../models/Customer");
const throwValidationError = require("../utils/err/throwValidationError");
const throwBadRequestError = require("../utils/err/throwBadRequestError");
const throwNotFoundError = require("../utils/err/throwNotFoundError");

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

  const employee = new Employee({
    ...req.body,
    profilePicture: profilePicture[0],
    documents: documents,
    customers: [],
  });
  try {
    const savedEmployee = await employee.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", savedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  const ownerId = req.params.ownerId;
  try {
    const employees = await Employee.find({ ownerId: ownerId }).populate({
      path: "customers",
      select: "name email phone profilePicture",
    });

    if (!employees) {
      throwNotFoundError("Employees not found");
    }

    res.status(200).json({ employees: employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignCustomer = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

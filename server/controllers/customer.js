const { validationResult } = require("express-validator");
const throwValidationError = require("../utils/err/throwValidationError");
const throwBadRequestError = require("../utils/err/throwBadRequestError");
const Owner = require("../models/owner");
const Customer = require("../models/Customer");
const Exersice = require("../models/Exercise");
const CalenderAcv = require("../models/CalenderAcv");
const Employee = require("../models/Employees");
const {
  uploadImageToStorage,
  deleteImageFromStorage,
} = require("../utils/firebase/firebase.utils");
const customerServices = require("../services/customerService");

exports.addCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }
  try {
    const {
      age,
      bodyWeight,
      height,
      membershipMonths,
      membershipPrice,
      coach,
      ownerId,
      parentPhone,
    } = req.body;

    const fetchedOwner = await Owner.findById(ownerId);
    if (!fetchedOwner) {
      throwBadRequestError("Owner not found.");
    }
    const profilePicture = req.file.originalname + "-" + Date.now();
    const downloadURL = await uploadImageToStorage(
      req.file,
      "customers/" + profilePicture
    );

    const customer = new Customer({
      ...req.body,
      coachPT: coach || null,
      age: +age,
      bodyWeight: +bodyWeight,
      height: +height,
      membershipPrice: +membershipPrice,
      membershipStartDate: new Date(),
      membershipEndDate: new Date(
        new Date().setMonth(new Date().getMonth() + +membershipMonths)
      ),
      membershipType: membershipMonths,
      exercisePlan: [],
      profilePicture: downloadURL,
      parentPhone: parentPhone ? parentPhone : null,
    });

    const savedCustomer = await customer.save();
    fetchedOwner.customer.push(savedCustomer._id);
    await fetchedOwner.save();
    res.status(201).json({
      message: "Customer created successfully!",
      customer: savedCustomer,
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCustomer = async (req, res, next) => {
  try {
    const ownerId = req.userId;
    const fetchedCustomer = await customerServices.getCustomerByOwnerId(
      ownerId
    );
    res.status(200).json({
      message: "Fetched customers successfully!",
      customers: fetchedCustomer,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }
  const { _id, ownerId } = req.body;
  try {
    const fetchedOwner = await Owner.findById(ownerId);
    if (!fetchedOwner) {
      throwBadRequestError("Owner not found.");
    }
    if (!fetchedOwner.customer.includes(_id)) {
      throwBadRequestError("Customer not found.");
    }
    const customer = await Customer.findById(_id);
    if (!customer) {
      throwBadRequestError("Customer not found.");
    }

    customer = {
      ...req.body,
      membershipType: req.body.membershipMonths,
      membershipPrice: req.body.membershipPrice,
      membershipStatus: req.body.membershipStatus,
      exercisePlan: req.body.exercisePlan || customer.exercisePlan,
    };

    const updatedCustomer = await customer.save();
    res.status(200).json({
      message: "Customer updated successfully!",
      customer: updatedCustomer,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;
  if (!customerId) throwBadRequestError("Customer not found.");
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throwBadRequestError("Customer not found.");
    }
    const ownerId = customer.ownerId;
    const fetchedOwner = await Owner.findById(ownerId);
    if (!fetchedOwner) {
      throwBadRequestError("Owner not found.");
    }
    fetchedOwner.customer.pull(customerId);
    await fetchedOwner.save();
    deleteImageFromStorage(customer.profilePicture);
    await customer.deleteOne();
    res.status(200).json({
      message: "Customer deleted successfully!",
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

exports.findCustomer = async (req, res, next) => {
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
      throwBadRequestError("Customer not found.");
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
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteCustomerExercisePlan = async (req, res, next) => {
  const { customerId, exerciseName } = req.body;
  if (!customerId) throwBadRequestError("Customer not found.");
  try {
    const fetchedCustomer = await Customer.findById(customerId);
    if (!fetchedCustomer) {
      throwBadRequestError("Customer not found.");
    }
    const deleteExersice = fetchedCustomer.exercisePlan.filter(
      (exersice) => exersice !== exerciseName
    );
    fetchedCustomer.exercisePlan = deleteExersice;
    const updatedCustomer = await fetchedCustomer.save();
    res.status(200).json({
      message: "Customer exercise plan deleted successfully!",
      customer: updatedCustomer,
      status: 200,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateCustomerPlan = async (req, res, next) => {
  const { customerId, exerciseName } = req.body;
  if (!customerId) throwBadRequestError("Customer not found.");
  try {
    const fetchedCustomer = await Customer.findById(customerId);
    if (!fetchedCustomer) {
      throwBadRequestError("Customer not found.");
    }
    const newExersice = exerciseName.filter((exersice) => {
      if (!fetchedCustomer.exercisePlan.includes(exersice)) {
        return exersice;
      }
    });
    fetchedCustomer.exercisePlan = [
      ...fetchedCustomer.exercisePlan,
      ...newExersice,
    ];
    await fetchedCustomer.save();
    res.status(200).json({
      message: "Customer exercise plan updated successfully!",
      status: 200,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.addCustomerActivity = async (req, res, next) => {
  const { date, planText, planType, customerId, color } = req.body;
  if (!customerId) throwBadRequestError("Customer not found.");

  const fetchedCustomer = await Customer.findById(customerId);
  if (!fetchedCustomer) {
    throwBadRequestError("Customer not found.");
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

exports.deleteCustomerCoach = async (req, res, next) => {
  const { customerId } = req.body;
  if (!customerId) throwBadRequestError("Customer not found.");
  try {
    const fetchedCustomer = await Customer.findById(customerId);
    if (!fetchedCustomer) {
      throwBadRequestError("Customer not found.");
    }
    const fetchedEmployee = await Employee.findById(fetchedCustomer.coachPT);
    if (!fetchedEmployee) {
      throwBadRequestError("Employee not found.");
    }
    fetchedEmployee.customers.pull(customerId);
    await fetchedEmployee.save();
    fetchedCustomer.coachPT = null;
    await fetchedCustomer.save();
    res.status(200).json({
      message: "Customer coach deleted successfully!",
      status: 200,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

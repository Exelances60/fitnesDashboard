const { validationResult } = require("express-validator");
const throwValidationError = require("../utils/err/throwValidationError");
const throwBadRequestError = require("../utils/err/throwBadRequestError");
const Owner = require("../models/owner");
const Customer = require("../models/Customer");
const Exersice = require("../models/Exercise");
const CalenderAcv = require("../models/CalenderAcv");
const clearImage = require("../utils/clearImage");

exports.addCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }
  try {
    const {
      name,
      phone,
      email,
      age,
      bodyWeight,
      height,
      membershipMonths,
      membershipPrice,
      membershipStatus,
      coach,
      ownerId,
      gender,
      address,
      bloodGroup,
      parentPhone,
    } = req.body;

    const fetchedOwner = await Owner.findById(ownerId);
    if (!fetchedOwner) {
      throwBadRequestError("Owner not found.");
    }
    const profilePicture = req.file.path.replace(/\\/g, "/");
    const customer = new Customer({
      name,
      phone,
      email,
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
      membershipStatus: membershipStatus,
      gender: gender,
      exercisePlan: null,
      ownerId,
      profilePicture: profilePicture,
      address,
      bloodGroup,
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
    const ownerId = req.params.ownerId;
    const fetchedOwner = await Owner.findById(ownerId).populate("customer");
    if (!fetchedOwner) {
      throwBadRequestError("Owner not found.");
    }
    res.status(200).json({
      message: "Fetched customers successfully!",
      customers: fetchedOwner.customer,
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
  const {
    name,
    email,
    phone,
    age,
    bodyWeight,
    height,
    membershipMonths,
    membershipPrice,
    membershipStatus,
    exercisePlan,
    coach,
    _id,
    ownerId,
  } = req.body;
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

    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.age = age;
    customer.bodyWeight = bodyWeight;
    customer.height = height;
    customer.membershipType = membershipMonths;
    customer.membershipPrice = membershipPrice;
    customer.membershipStatus = membershipStatus;
    customer.exercisePlan = exercisePlan || customer.exercisePlan;
    customer.coachPT = coach || null;
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
    clearImage(customer.profilePicture);
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
    const fetchedCustomer = await Customer.findById(customerId).populate(
      "calendarAcv"
    );
    const fetchedExersice = await Exersice.find({
      name: fetchedCustomer.exercisePlan,
    });
    fetchedCustomer.exercisePlan = fetchedExersice;
    if (!fetchedCustomer) {
      throwBadRequestError("Customer not found.");
    }
    res.status(200).json({
      message: "Fetched customer successfully!",
      customer: fetchedCustomer,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCustomerExercisePlan = async (req, res, next) => {
  const { customerId, exerciseName } = req.body;
  if (!customerId) throwBadRequestError("Customer not found.");

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
};

exports.updateCustomerPlan = async (req, res, next) => {
  const { customerId, exerciseName } = req.body;
  if (!customerId) throwBadRequestError("Customer not found.");
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

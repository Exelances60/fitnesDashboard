const { validationResult } = require("express-validator");
const throwValidationError = require("../utils/throwValidationError");
const throwBadRequestError = require("../utils/throwBadRequestError");
const Owner = require("../models/owner");
const Customer = require("../models/customer");

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
      coach,
      membershipStatus,
      ownerId,
      gender,
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
      exercisePlan: {},
      ownerId,
      profilePicture: profilePicture,
    });

    const savedCustomer = await customer.save();
    fetchedOwner.members.push(savedCustomer._id);
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

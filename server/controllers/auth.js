const Owner = require("../models/owner");
require("dotenv").config();
const { validationResult } = require("express-validator");
const throwNotFoundError = require("../utils/err/throwNotFoundError");
const throwValidationError = require("../utils/err/throwValidationError");
const jwtServices = require("../services/jwtServices");
const userServices = require("../services/userService");
const firebaseStorageServices = require("../services/FirebaseServices");

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Validation failed, entered data is incorrect.");
    }
    const { email, password } = req.body;
    const owner = await Owner.findOne({ email });
    if (!owner) {
      throw new Error("A owner with this email could not be found.");
    }
    const isPasswordMatch = await jwtServices.comparePassword(
      password,
      owner.password
    );

    if (!isPasswordMatch) {
      throw new Error("Wrong password!");
    }

    const token = jwtServices.signToken({
      email: owner.email,
      ownerId: owner._id.toString(),
      _id: owner._id.toString(),
    });

    res.status(200).json({
      token,
      ownerId: owner._id.toString(),
      message: "Login successful!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Set default status code if not provided
    }
    next(err); // Pass the error to the error handling middleware
  }
};

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }

  const { email, password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const owner = new Owner({
        email,
        password: hashedPw,
        companyName: "test",
        address: "test",
        phone: "1234567890",
      });
      return owner.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Owner created!", ownerId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getOwnerInfo = async (req, res, next) => {
  const ownerId = req.userId;
  try {
    const owner = await Owner.findById(ownerId).select(
      "email companyName address phone ownerImage productCategory memberShipList memberShipPrice memberShipMonths"
    );
    if (!owner) {
      throwNotFoundError("Could not find owner.");
    }
    res.status(200).json({ message: "Owner fetched.", owner: owner });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateOwner = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }
  const ownerId = req.userId;
  try {
    const fetchedOwner = await userServices.findByIdUpdate(
      ownerId,
      req.body,
      Owner
    );

    if (!fetchedOwner) {
      throwNotFoundError("Could not find owner.");
    }

    res.status(200).json({ message: "Owner updated!", owner: fetchedOwner });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.uploadOwnerImage = async (req, res, next) => {
  try {
    const ownerId = req.userId;
    const dowlandURLOwnerImage =
      await firebaseStorageServices.uploadImageToStorage(req.file, "owner/");

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      throwNotFoundError("Could not find owner.");
    }
    if (owner.ownerImage) {
      await firebaseStorageServices.deleteImageFromStorage(owner.ownerImage);
    }
    owner.ownerImage = dowlandURLOwnerImage;
    await owner.save();
    res
      .status(201)
      .json({ message: "Owner Image uploaded.", ownerImage: owner.ownerImage });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

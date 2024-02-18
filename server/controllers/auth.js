const Owner = require("../models/owner");
require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const throwNotFoundError = require("../utils/err/throwNotFoundError");
const throwValidationError = require("../utils/err/throwValidationError");
const throwBadRequestError = require("../utils/err/throwBadRequestError");

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }
  const { email, password } = req.body;
  let loadedOwner;
  Owner.findOne({ email })
    .then((owner) => {
      if (!owner) {
        throwNotFoundError("A owner with this email could not be found.");
      }
      loadedOwner = owner;
      return bcrypt.compare(password, owner.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        throwBadRequestError("Wrong password!");
      }
      const token = jwt.sign(
        {
          email: loadedOwner.email,
          companyName: loadedOwner.companyName,
          ownerId: loadedOwner._id.toString(),
          productCategory: loadedOwner.productCategory,
          _id: loadedOwner._id.toString(),
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        ownerId: loadedOwner._id.toString(),
        message: "Login successful!",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
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

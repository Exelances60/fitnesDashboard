const Owner = require("../models/owner");
require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedOwner;
  Owner.findOne({ email })
    .then((owner) => {
      if (!owner) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedOwner = owner;
      return bcrypt.compare(password, owner.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedOwner.email,
          ownerId: loadedOwner._id.toString(),
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

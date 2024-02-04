const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.login
);

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password").trim().isLength({ min: 5 }),
    body("companyName").trim().not().isEmpty(),
  ],
  authController.signup
);

module.exports = router;

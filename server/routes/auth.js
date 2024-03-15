const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");

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

router.get("/ownerInfo", isAuth, authController.getOwnerInfo);

router.post(
  "/add-owner-membershipList",
  isAuth,
  authController.addMembershipList
);

router.put(
  "/update-owner",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("companyName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a valid company name."),
    body("address")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a valid address."),
    body("phone")
      .matches(/^[0-9]{10}$/)
      .withMessage("Please enter a valid phone number.")
      .trim(),
    body("memberShipPrice").isInt().withMessage("Please enter a valid price."),
  ],
  authController.updateOwner
);

module.exports = router;

const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");
const multer = require("multer");
const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

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

router.put(
  "/update-owner",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("phone")
      .matches(/^[0-9]{10}$/)
      .withMessage("Please enter a valid phone number.")
      .trim(),
    body("memberShipPrice").isInt().withMessage("Please enter a valid price."),
  ],
  authController.updateOwner
);

router.put(
  "/uploadOwnerImage",
  isAuth,
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).single(
    "ownerImage"
  ),
  authController.uploadOwnerImage
);

module.exports = router;

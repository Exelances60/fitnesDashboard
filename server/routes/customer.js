const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const customerController = require("../controllers/customer");

const multer = require("multer");

const customerStorange = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/customer");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

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
  "/add-customer",
  isAuth,
  multer({ storage: customerStorange, fileFilter: fileFilter }).single(
    "profilePicture"
  ),
  customerController.addCustomer
);

router.get("/get-customer/:ownerId", isAuth, customerController.getCustomer);

module.exports = router;

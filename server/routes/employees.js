const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employees");
const isAuth = require("../middleware/isAuth");

const multer = require("multer");

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
  "/create-employee",
  isAuth,
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).any(
    "profilePicture"
  ),
  employeeController.createEmployee
);

router.get("/get-employees", isAuth, employeeController.getEmployees);

router.post("/assignCustomer", isAuth, employeeController.assignCustomer);

router.put("/update-employee", isAuth, employeeController.updateEmployee);

router.delete(
  "/delete-employee/:employeeId",
  isAuth,
  employeeController.deleteEmployee
);

module.exports = router;

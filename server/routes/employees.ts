import { Router } from "express";
import * as employeeController from "../controllers/employees";
import { isAuth } from "../middleware/isAuth";
import multer from "multer";
import { fileFilter } from "../utils/MulterFileFilter";
import {
  assignCustomerValidator,
  createEmployeesValidator,
  updateEmployeeValidator,
} from "../Validator/Employees";

const router = Router();

router.post(
  "/create-employee",
  isAuth,
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).any(),
  createEmployeesValidator,
  employeeController.createEmployee
);

router.get("/get-employees", isAuth, employeeController.getEmployees);

router.post(
  "/assignCustomer",
  isAuth,
  assignCustomerValidator,
  employeeController.assignCustomer
);

router.put(
  "/update-employee",
  isAuth,
  updateEmployeeValidator,
  employeeController.updateEmployee
);

router.delete(
  "/delete-employee/:employeeId",
  isAuth,
  employeeController.deleteEmployee
);

export { router as employeeRoutes };

import { Router, Request } from "express";
import * as employeeController from "../controllers/employees";
import { isAuth } from "../middleware/isAuth";
import multer from "multer";

const router = Router();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
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
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).any(),
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

export default router;

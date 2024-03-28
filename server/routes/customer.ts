import { Router } from "express";
import { body } from "express-validator";
import { isAuth } from "../middleware/isAuth";
import * as customerController from "../controllers/customer";
import multer from "multer";
import { fileFilter } from "../utils/MulterFileFilter";

const router = Router();

router.post(
  "/add-customer",
  isAuth,
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).single(
    "profilePicture"
  ),
  customerController.addCustomer
);

router.get("/get-customer", isAuth, customerController.getCustomer);

router.put(
  "/update-customer",
  isAuth,
  [
    body("name").trim().isLength({ min: 3 }),
    body("phone").trim().isLength({ min: 10 }),
    body("email").isEmail(),
    body("age").isNumeric(),
    body("bodyWeight").isNumeric(),
    body("height").isNumeric(),
    body("membershipMonths").isNumeric(),
    body("membershipPrice").isNumeric(),
  ],
  customerController.updateCustomer
);

router.delete(
  "/delete-customer/:customerId",
  isAuth,
  customerController.deleteCustomer
);

router.get(
  "/findcustomer/:customerId",
  isAuth,
  customerController.findCustomer
);

router.put(
  "/delete-customer-exercise-plan",
  isAuth,
  customerController.deleteCustomerExercisePlan
);

router.put(
  "/update-customer-plan",
  isAuth,
  customerController.updateCustomerPlan
);

router.post(
  "/add-customer-activity",
  isAuth,
  customerController.addCustomerActivity
);

router.delete(
  "/remove-customer-coach",
  isAuth,
  customerController.deleteCustomerCoach
);

export { router as customerRoutes };

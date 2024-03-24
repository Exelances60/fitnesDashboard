import { Router } from "express";
import { body } from "express-validator";
import * as orderController from "../controllers/order";
import { isAuth } from "../middleware/isAuth";
import { scheduleJob } from "node-schedule";
import { scheduleJobs } from "../controllers/scheduleJobs";

const router = Router();

const sendInformantion = scheduleJob("0 0 * * *", scheduleJobs);

router.post(
  "/create-order",
  [
    body("price").isNumeric(),
    body("amount").isNumeric(),
    body("email").isEmail().trim(),
    body("address").isLength({ min: 10 }),
    body("phone").isLength({ min: 10 }),
  ],
  isAuth,
  orderController.createOrder
);

router.get("/get-orders", isAuth, orderController.getOrders);

router.put("/update-order", isAuth, orderController.updateOrder);

router.post("/ordercompleted", isAuth, orderController.orderCompleted);

export { router as orderRoutes };

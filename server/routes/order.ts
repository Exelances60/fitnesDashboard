import { Router } from "express";
import * as orderController from "../controllers/order";
import { isAuth } from "../middleware/isAuth";
import { scheduleJob } from "node-schedule";
import { scheduleJobs } from "../controllers/scheduleJobs";
import { createOrderValidator } from "../Validator/Order";

const router = Router();

const sendInformantion = scheduleJob("0 0 * * *", scheduleJobs);

router.post(
  "/create-order",
  isAuth,
  createOrderValidator,
  orderController.createOrder
);

router.get("/get-orders", isAuth, orderController.getOrders);

router.put("/update-order", isAuth, orderController.updateOrder);

router.post("/ordercompleted", isAuth, orderController.orderCompleted);

router.post("/createOrderInvoice", isAuth, orderController.createOrderInvoice);

export { router as orderRoutes };

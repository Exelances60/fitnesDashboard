const express = require("express");
const { body } = require("express-validator");
const orderController = require("../controllers/order");
const schedule = require("node-schedule");
const isAuth = require("../middleware/isAuth");
const { scheduleJobs } = require("../controllers/scheduleJobs");

const router = express.Router();

const sendInformantion = schedule.scheduleJob("0 0 * * *", scheduleJobs);

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

module.exports = router;

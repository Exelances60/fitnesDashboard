const express = require("express");
const { body } = require("express-validator");
const orderController = require("../controllers/order");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

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

router.get("/get-orders/:ownerId", isAuth, orderController.getOrders);

module.exports = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderCompleted = exports.updateOrder = exports.getOrders = exports.createOrder = void 0;
require("dotenv/config");
const express_validator_1 = require("express-validator");
const Product_1 = __importDefault(require("../models/Product"));
const Order_1 = __importDefault(require("../models/Order"));
const Owner_1 = __importDefault(require("../models/Owner"));
const throwBadRequestError_1 = __importDefault(require("../utils/err/throwBadRequestError"));
const throwNotFoundError_1 = __importDefault(require("../utils/err/throwNotFoundError"));
const throwValidationError_1 = __importDefault(require("../utils/err/throwValidationError"));
const calculatePreviousMonthSales_1 = require("../services/businessLogic/calculatePreviousMonthSales");
const createOrder = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, throwValidationError_1.default)("Validation failed, entered data is incorrect.");
    }
    const { price, amount, email, address, productId, creator, orderOwner } = req.body;
    if (!productId) {
        (0, throwNotFoundError_1.default)("Product not  matched.");
    }
    let fetchedProduct;
    let fetchedOrder;
    Product_1.default.findById(productId)
        .then((product) => {
        if (!product) {
            return (0, throwNotFoundError_1.default)("Product not found.");
        }
        if (amount > product.amount) {
            (0, throwBadRequestError_1.default)("The amount of product is not enough.");
        }
        if (product.amount === 0) {
            (0, throwBadRequestError_1.default)("The product is out of stock.");
        }
        fetchedProduct = product;
        product.amount = product.amount - amount;
        return product.save();
    })
        .then((result) => {
        const totalPrice = price * amount;
        const order = new Order_1.default({
            totalPrice,
            orderOwnerEmail: email,
            adress: address,
            productsId: productId,
            orderOwner: orderOwner,
            status: "Preparing",
            orderImage: result.imageUrl,
            orderCategory: result.category,
        });
        return order.save();
    })
        .then((result) => {
        fetchedOrder = result;
        return Owner_1.default.findById(creator);
    })
        .then((owner) => {
        if (!owner) {
            return (0, throwNotFoundError_1.default)("Owner not found.");
        }
        owner.orders.push(fetchedOrder._id);
        return owner.save();
    })
        .then((result) => {
        /* sendMailOrderCreate(
          fetchedOrder.orderOwnerEmail,
          process.env.SENDER_MAIL,
          "Order Confirmation",
          "Your order has been successfully placed!",
          {
            name: fetchedProduct.name,
            imageUrl: fetchedProduct.imageUrl,
            amount: fetchedOrder.amount,
            price: fetchedProduct.price,
            totalPrice: fetchedOrder.totalPrice,
          }
        ); */
        res.status(201).json({
            message: "Order created successfully!",
            order: result,
            status: 201,
        });
    });
};
exports.createOrder = createOrder;
const getOrders = async (req, res, next) => {
    try {
        const ownerId = req.userId;
        if (!ownerId) {
            (0, throwNotFoundError_1.default)("Owner not found.");
        }
        const orders = await Order_1.default.find({ creator: ownerId });
        if (!orders) {
            return res.status(400).json({
                message: "Orders not found.",
                status: 400,
            });
        }
        const productIds = orders.flatMap((order) => order.productsId);
        const products = await Product_1.default.find({ _id: { $in: productIds } });
        if (!products) {
            return res.status(400).json({
                message: "Products not found.",
                status: 400,
            });
        }
        const ordersWithProducts = orders.map((order) => {
            const orderProducts = products.filter((product) => order.productsId.includes(product._id));
            return { ...order.toObject(), products: orderProducts };
        });
        const chartsData = ordersWithProducts.flatMap((order) => ({
            name: order.products.map((product) => product.name).join(", "),
            category: order.products.map((product) => product.category).join(", "),
            price: order.products.reduce((acc, product) => acc + product.price, 0),
            amount: order.products.reduce((acc, product) => acc + product.amount, 0),
            totalPrice: order.totalPrice,
            amountOrder: order.amount,
            orderId: order._id,
        }));
        const increasePercentageForSales = (0, calculatePreviousMonthSales_1.calculatePreviousMonthSales)(ordersWithProducts);
        const previousMonthAmount = (0, calculatePreviousMonthSales_1.calculatePreviousMonthAmount)(ordersWithProducts);
        const increasePercentageForCompletedSales = (0, calculatePreviousMonthSales_1.calculatePreviosMonthComplateSales)(ordersWithProducts);
        const totalSalesPrice = ordersWithProducts.reduce((acc, order) => acc + order.totalPrice, 0);
        const totalSalesCompleted = ordersWithProducts
            .filter((order) => order.status === "Completed")
            .reduce((acc, order) => acc + order.totalPrice, 0);
        const increasePercentageForAmount = ((ordersWithProducts.length - previousMonthAmount) /
            previousMonthAmount) *
            100;
        res.status(200).json({
            message: "Fetched orders successfully.",
            orders: ordersWithProducts,
            chartsData,
            cardData: {
                totalOrders: ordersWithProducts.length,
                totalSalesPrice,
                increasePercentageForSales,
                totalSalesCompleted,
                increasePercentageForAmount,
                increasePercentageForCompletedSales,
            },
        });
    }
    catch (err) {
        (0, throwNotFoundError_1.default)("Fetching orders failed.");
    }
};
exports.getOrders = getOrders;
const updateOrder = (req, res, next) => {
    const updatedOrder = req.body.data;
    const orderId = req.body.params.orderId;
    Order_1.default.findByIdAndUpdate(orderId, updatedOrder).then((result) => {
        if (!result) {
            (0, throwNotFoundError_1.default)("Order not found.");
        }
        res.status(200).json({
            message: "Order updated successfully!",
            status: 200,
            order: result,
        });
    });
};
exports.updateOrder = updateOrder;
const orderCompleted = (req, res, next) => {
    const orderId = req.body.orderId;
    Order_1.default.findById(orderId)
        .then((order) => {
        if (!order) {
            return (0, throwNotFoundError_1.default)("Order not found.");
        }
        if (order.status === "Completed") {
            return (0, throwBadRequestError_1.default)("Order already completed.");
        }
        order.status = "Completed";
        return order.save();
    })
        .then((result) => {
        if (!result) {
            (0, throwNotFoundError_1.default)("Order not found.");
        }
        /*       sendMail(
          result.orderOwnerEmail,
          process.env.SENDER_MAIL,
          "Order Completed",
          "Your order has been completed successfully!"
        ); */
        res.status(200).json({
            message: "Order completed successfully!",
            status: 200,
        });
    });
};
exports.orderCompleted = orderCompleted;
//# sourceMappingURL=order.js.map
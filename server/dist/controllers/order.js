"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderInvoice = exports.orderCompleted = exports.updateOrder = exports.getOrders = exports.createOrder = void 0;
require("dotenv/config");
const calculatePreviousMonthSales_1 = require("../services/businessLogic/calculatePreviousMonthSales");
const OrderServices_1 = require("../services/OrderServices");
const PDFServices_1 = require("../services/PDFServices");
const createOrder = async (req, res, next) => {
    try {
        /*    const errors = validationResult(req);
        printValidatorErrors(errors); */
        const result = await new OrderServices_1.OrderServices().createOrder(req);
        /* sendMailOrderCreate(
          order.orderOwnerEmail,
          process.env.SENDER_MAIL,
          "Order Confirmation",
          "Your order has been successfully placed!",
          {
            name: product.name,
            imageUrl: product.imageUrl,
            amount: order.amount,
            price: product.price,
            totalPrice: order.totalPrice,
          }
        ); */
        res.status(201).json({
            message: "Order created successfully!",
            order: result,
            status: 201,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res, next) => {
    try {
        const { chartsData, ordersWithProducts } = await new OrderServices_1.OrderServices().getOrders(req);
        const increasePercentageForSales = (0, calculatePreviousMonthSales_1.calculatePreviousMonthSales)(ordersWithProducts);
        const previousMonthAmount = (0, calculatePreviousMonthSales_1.calculatePreviousMonthAmount)(ordersWithProducts);
        const increasePercentageForCompletedSales = (0, calculatePreviousMonthSales_1.calculatePreviosMonthComplateSales)(ordersWithProducts);
        const currentMonthAmount = (0, calculatePreviousMonthSales_1.calculateCurrentMonthAmount)(ordersWithProducts);
        const increasePercentageForAmount = ((ordersWithProducts.length - previousMonthAmount) /
            previousMonthAmount) *
            100 ===
            Infinity
            ? currentMonthAmount * 100
            : ((ordersWithProducts.length - previousMonthAmount) /
                previousMonthAmount) *
                100;
        const totalSalesPrice = ordersWithProducts.reduce((acc, order) => acc + order.totalPrice, 0);
        const totalSalesCompleted = ordersWithProducts
            .filter((order) => order.status === "Completed")
            .reduce((acc, order) => acc + order.totalPrice, 0);
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
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getOrders = getOrders;
const updateOrder = async (req, res, next) => {
    try {
        const result = await new OrderServices_1.OrderServices().updateOrder(req);
        res.status(200).json({
            message: "Order updated successfully!",
            status: 200,
            order: result,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.updateOrder = updateOrder;
const orderCompleted = async (req, res, next) => {
    try {
        await new OrderServices_1.OrderServices().orderCompleted(req);
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
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.orderCompleted = orderCompleted;
const createOrderInvoice = async (req, res, next) => {
    try {
        const { htmlString } = req.body;
        const pdf = await new PDFServices_1.PDFServices().htmlToPdf(htmlString);
        res.status(200).json({
            message: "Invoice created successfully!",
            status: 200,
            pdf,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.createOrderInvoice = createOrderInvoice;
//# sourceMappingURL=order.js.map
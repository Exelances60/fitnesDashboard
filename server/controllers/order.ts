import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Product from "../models/Product";
import Order from "../models/Order";
import Owner from "../models/Owner";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import senMailOrderCreate from "../utils/sendMailOrderCreate";
import {
  calculatePreviousMonthSales,
  calculatePreviousMonthAmount,
  calculatePreviosMonthComplateSales,
} from "../services/businessLogic/calculatePreviousMonthSales";
import { printValidatorErrors } from "../utils/printValidatorErrors";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*    const errors = validationResult(req);
    printValidatorErrors(errors); */
    const { price, amount, email, address, productId, creator } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return throwNotFoundError("Product not found.");
    }

    product.amount = product.amount - amount;
    await product.save();

    const totalPrice = price * amount;
    const order = new Order({
      totalPrice,
      orderOwnerEmail: email,
      adress: address,
      productsId: productId,
      status: "Preparing",
      orderImage: product.imageUrl,
      orderCategory: product.category,
      ...req.body,
    });
    const result = await order.save();

    const owner = await Owner.findById(creator);
    if (!owner) {
      return throwNotFoundError("Owner not found.");
    }
    owner.orders.push(result._id);
    await owner.save();

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
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerId = req.userId;
    if (!ownerId) {
      throwNotFoundError("Owner not found.");
    }

    const orders = await Order.find({ creator: ownerId });
    if (!orders) {
      return res.status(400).json({
        message: "Orders not found.",
        status: 400,
      });
    }

    const productIds = orders.flatMap((order) => order.productsId);
    const products = await Product.find({ _id: { $in: productIds } });
    if (!products) {
      return res.status(400).json({
        message: "Products not found.",
        status: 400,
      });
    }

    const ordersWithProducts = orders.map((order) => {
      const orderProducts = products.filter((product) =>
        order.productsId.includes(product._id)
      );
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
    const increasePercentageForSales =
      calculatePreviousMonthSales(ordersWithProducts);
    const previousMonthAmount =
      calculatePreviousMonthAmount(ordersWithProducts);
    const increasePercentageForCompletedSales =
      calculatePreviosMonthComplateSales(ordersWithProducts);

    const totalSalesPrice = ordersWithProducts.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

    const totalSalesCompleted = ordersWithProducts
      .filter((order) => order.status === "Completed")
      .reduce((acc, order) => acc + order.totalPrice, 0);

    const increasePercentageForAmount =
      ((ordersWithProducts.length - previousMonthAmount) /
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
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updatedOrder = req.body.data;
  const orderId = req.body.params.orderId;
  Order.findByIdAndUpdate(orderId, updatedOrder).then((result) => {
    if (!result) {
      throwNotFoundError("Order not found.");
    }
    res.status(200).json({
      message: "Order updated successfully!",
      status: 200,
      order: result,
    });
  });
};

export const orderCompleted = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = req.body.orderId;
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return throwNotFoundError("Order not found.");
      }
      if (order.status === "Completed") {
        return throwBadRequestError("Order already completed.");
      }

      order.status = "Completed";
      return order.save();
    })
    .then((result) => {
      if (!result) {
        throwNotFoundError("Order not found.");
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

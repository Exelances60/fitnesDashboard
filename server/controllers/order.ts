import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Product from "../models/Product";
import Order, { IOrder } from "../models/Order";
import Owner from "../models/Owner";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import throwValidationError from "../utils/err/throwValidationError";
import senMailOrderCreate from "../utils/sendMailOrderCreate";
import {
  calculatePreviousMonthSales,
  calculatePreviousMonthAmount,
  calculatePreviosMonthComplateSales,
} from "../services/businessLogic/calculatePreviousMonthSales";

export const createOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }
  const { price, amount, email, address, productId, creator, orderOwner } =
    req.body;

  if (!productId) {
    throwNotFoundError("Product not  matched.");
  }

  let fetchedProduct;
  let fetchedOrder: IOrder;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return throwNotFoundError("Product not found.");
      }

      if (amount > product.amount) {
        throwBadRequestError("The amount of product is not enough.");
      }

      if (product.amount === 0) {
        throwBadRequestError("The product is out of stock.");
      }

      fetchedProduct = product;
      product.amount = product.amount - amount;

      return product.save();
    })
    .then((result) => {
      const totalPrice = price * amount;
      const order = new Order({
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
      return Owner.findById(creator);
    })
    .then((owner) => {
      if (!owner) {
        return throwNotFoundError("Owner not found.");
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
  } catch (err) {
    throwNotFoundError("Fetching orders failed.");
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

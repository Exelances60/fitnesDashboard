import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import {
  calculatePreviousMonthSales,
  calculatePreviousMonthAmount,
  calculatePreviosMonthComplateSales,
  calculateCurrentMonthAmount,
} from "../services/businessLogic/calculatePreviousMonthSales";
import { printValidatorErrors } from "../utils/printValidatorErrors";
import { OrderServices } from "../services/OrderServices";
import { PDFServices } from "../services/PDFServices";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*    const errors = validationResult(req);
    printValidatorErrors(errors); */
    const result = await new OrderServices().createOrder(req);
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
    const { chartsData, ordersWithProducts } =
      await new OrderServices().getOrders(req);

    const increasePercentageForSales =
      calculatePreviousMonthSales(ordersWithProducts);
    const previousMonthAmount =
      calculatePreviousMonthAmount(ordersWithProducts);
    const increasePercentageForCompletedSales =
      calculatePreviosMonthComplateSales(ordersWithProducts);
    const currentMonthAmount = calculateCurrentMonthAmount(ordersWithProducts);

    const increasePercentageForAmount =
      ((ordersWithProducts.length - previousMonthAmount) /
        previousMonthAmount) *
        100 ===
      Infinity
        ? currentMonthAmount * 100
        : ((ordersWithProducts.length - previousMonthAmount) /
            previousMonthAmount) *
          100;

    const totalSalesPrice = ordersWithProducts.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

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
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const result = await new OrderServices().updateOrder(req);
    res.status(200).json({
      message: "Order updated successfully!",
      status: 200,
      order: result,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const orderCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await new OrderServices().orderCompleted(req);
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
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const createOrderInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { htmlString } = req.body;
    const pdf = await new PDFServices().htmlToPdf(htmlString);
    res.status(200).json({
      message: "Invoice created successfully!",
      status: 200,
      pdf,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { ProductServices } from "../services/ProductServices";
import { validationResult } from "express-validator";
import { printValidatorErrors } from "../utils/printValidatorErrors";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    printValidatorErrors(errors);
    const result = await new ProductServices().createProduct(req);
    res.status(201).json({
      message: "Product created successfully!",
      product: result,
      status: 201,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await new ProductServices().getProducts(req);
    res.status(200).json({
      message: "Fetched products successfully.",
      products: products,
      status: 200,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await new ProductServices().deleteProduct(req);
    res.status(200).json({ message: "Deleted product.", status: 200 });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    printValidatorErrors(errors);
    const product = await new ProductServices().updateProduct(req);
    res
      .status(200)
      .json({ message: "Product updated!", status: 200, product: product });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await new ProductServices().getProduct(req);
    res.status(200).json({
      message: "Product fetched successfully.",
      product: product,
      status: 200,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

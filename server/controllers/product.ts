import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import Owner from "../models/Owner";
import clearImage from "../utils/clearImage";
import throwValidationError from "../utils/err/throwValidationError";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import Order from "../models/Order";
import firebaseStorageServices from "../utils/FirebaseServices";
import { Types } from "mongoose";
import { ProductServices } from "../services/ProductServices";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
    await new ProductServices().updateProduct(req);
    res.status(200).json({ message: "Product updated!", status: 200 });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addProductCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await new ProductServices().addProductCategory(req);
    res.status(201).json({
      message: "Category added successfully!",
      status: 201,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

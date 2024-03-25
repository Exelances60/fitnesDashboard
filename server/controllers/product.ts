import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import Owner from "../models/Owner";
import { validationResult } from "express-validator";
import clearImage from "../utils/clearImage";
import throwValidationError from "../utils/err/throwValidationError";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import Order from "../models/Order";
import firebaseStorageServices from "../utils/FirebaseServices";
import { Types } from "mongoose";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwValidationError("Validation failed, entered data is incorrect.");
    }

    const { productName, price, description, amount, ownerId, category } =
      req.body;
    if (!req.file) {
      return throwBadRequestError("No image provided.");
    }

    const downloadURL = await firebaseStorageServices.uploadImageToStorage(
      req.file,
      "products/"
    );

    const product = new Product({
      name: productName,
      price: +price,
      description: description,
      imageUrl: downloadURL,
      amount: +amount,
      ownerId: ownerId,
      category: category,
    });

    const result = await product.save();

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return throwNotFoundError("Owner not found.");
    }
    owner.product.push(product._id);
    await owner.save();

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

export const getProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ownerId = req.userId;
  Product.find({ ownerId: ownerId })
    .then((products) => {
      res.status(200).json({
        message: "Fetched products successfully.",
        products: products,
        status: 200,
      });
    })
    .catch((err: any) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = new Types.ObjectId(req.params.productId);
    let ownerId;

    const product = await Product.findById(productId);
    if (!product) {
      return throwNotFoundError("Product not found.");
    }
    ownerId = product.ownerId;

    const fetchedOrders = await Order.find({ productsId: productId });

    const ordersHaveProductImage = fetchedOrders.filter(
      (order) => order.orderImage === product.imageUrl
    );

    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
      return throwNotFoundError("Product not found.");
    }

    if (!ordersHaveProductImage.length) {
      clearImage(result.imageUrl);
    }
    const owner = await Owner.findById(ownerId);

    if (!owner) {
      return throwNotFoundError("Owner not found.");
    }
    if (!owner.product.includes(productId)) {
      throwNotFoundError("Product not found in owner.");
    }
    owner.product.filter((prod) => prod.toString() !== productId.toString());
    await owner.save();
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
    const productId = req.params.productId;
    const { name, price, description, amount } = req.body;

    if (!name || !price || !description || !amount) {
      return throwValidationError("All fields must be filled.");
    }

    if (Number.isNaN(+price) || Number.isNaN(+amount)) {
      return throwValidationError("Price and amount must be a number.");
    }

    const product = await Product.findById(productId);
    if (!product) {
      return throwNotFoundError("Product not found.");
    }
    const imageUrl = req.file
      ? await firebaseStorageServices.uploadImageToStorage(
          req.file,
          "products/"
        )
      : product.imageUrl;

    if (imageUrl !== product.imageUrl && product.imageUrl) {
      firebaseStorageServices.deleteImageFromStorage(product.imageUrl);
    }

    product.imageUrl = imageUrl;
    product.name = name;
    product.price = +price;
    product.description = description;
    product.amount = +amount;
    product.category = product.category;

    await product.save();
    res.status(200).json({ message: "Product updated!", status: 200 });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addProductCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, ownerId } = req.body;
  if (!category) {
    throwValidationError("Category must be filled.");
  }
  Owner.findById(ownerId)
    .then((owner) => {
      if (!owner) {
        return throwNotFoundError("Owner not found.");
      }
      owner.productCategory?.push(category);
      return owner.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Category added successfully!",
        status: 201,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

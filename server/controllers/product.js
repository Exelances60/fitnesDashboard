require("dotenv").config();
const Product = require("../models/Product");
const Owner = require("../models/owner");
const { validationResult } = require("express-validator");
const clearImage = require("../utils/clearImage");
const throwValidationError = require("../utils/err/throwValidationError");
const throwBadRequestError = require("../utils/err/throwBadRequestError");
const throwNotFoundError = require("../utils/err/throwNotFoundError");
const sendMailInfoForProduct = require("../utils/sendMail");
const Order = require("../models/Order");
const {
  uploadImageToStorage,
  deleteImageFromStorage,
} = require("../utils/firebase/firebase.utils");

exports.addProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwValidationError("Validation failed, entered data is incorrect.");
    }

    const { productName, price, description, amount, ownerId, category } =
      req.body;
    if (!req.file) {
      throwBadRequestError("No image provided.");
    }

    const imageUrl = req.file.originalname + "-" + Date.now();

    const downloadURL = await uploadImageToStorage(
      req.file,
      "products/" + imageUrl
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
    owner.product.push(product);
    await owner.save();

    res.status(201).json({
      message: "Product created successfully!",
      product: product,
      status: 201,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProducts = (req, res, next) => {
  const ownerId = req.userId;
  Product.find({ ownerId: ownerId })
    .then((products) => {
      res.status(200).json({
        message: "Fetched products successfully.",
        products: products,
        status: 200,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    let ownerId;

    const product = await Product.findById(productId);
    if (!product) {
      throwNotFoundError("Product not found.");
    }
    ownerId = product.ownerId;

    const fetchedOrders = await Order.find({ productsId: productId });

    const ordersHaveProductImage = fetchedOrders.filter(
      (order) => order.orderImage === product.imageUrl
    );

    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
      throwNotFoundError("Product not found.");
    }

    if (!ordersHaveProductImage.length) {
      clearImage(result.imageUrl);
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      throwNotFoundError("Owner not found.");
    }
    if (!owner.product.includes(productId)) {
      throwNotFoundError("Product not found in owner.");
    }
    owner.product.pull(productId);
    await owner.save();

    res.status(200).json({ message: "Deleted product.", status: 200 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { name, price, description, amount } = req.body;
    const imageUrl = req.file ? req.file.originalname + "-" + Date.now() : null;
    let downloadURL;

    if (req.file && imageUrl) {
      downloadURL = await uploadImageToStorage(
        req.file,
        "products/" + imageUrl
      );
    }

    if (!name || !price || !description || !amount) {
      throwValidationError("All fields must be filled.");
    }

    if (Number.isNaN(+price) || Number.isNaN(+amount)) {
      throwValidationError("Price and amount must be a number.");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throwNotFoundError("Product not found.");
    }

    if (imageUrl !== product.imageUrl && imageUrl && product.imageUrl) {
      deleteImageFromStorage(product.imageUrl);
    }

    product.imageUrl = imageUrl ? downloadURL : product.imageUrl;
    product.name = name;
    product.price = +price;
    product.description = description;
    product.amount = +amount;
    product.category = product.category;

    const result = await product.save();

    res.status(200).json({ message: "Product updated!", status: 200 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addProductCategory = (req, res, next) => {
  const { category, ownerId } = req.body;
  if (!category) {
    throwValidationError("Category must be filled.");
  }
  Owner.findById(ownerId)
    .then((owner) => {
      if (!owner) {
        throwNotFoundError("Owner not found.");
      }
      owner.productCategory.push(category);
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

const Product = require("../models/product");
const Owner = require("../models/owner");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

exports.addProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { productName, price, description, amount, ownerId } = req.body;
  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path.replace(/\\/g, "/");

  const product = new Product({
    name: productName,
    price: +price,
    description: description,
    imageUrl: imageUrl,
    amount: +amount,
    ownerId: ownerId,
  });
  product
    .save()
    .then((result) => {
      return Owner.findById(ownerId);
    })
    .then((owner) => {
      owner.product.push(product);
      return owner.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Product created successfully!",
        product: product,
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

exports.getProducts = (req, res, next) => {
  const ownerId = req.params.ownerId;
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

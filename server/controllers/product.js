const Product = require("../models/product");
const Owner = require("../models/owner");
const { validationResult } = require("express-validator");
const clearImage = require("../utils/clearImage");
const throwValidationError = require("../utils/throwValidationError");
const throwBadRequestError = require("../utils/throwBadRequestError");
const throwNotFoundError = require("../utils/throwNotFoundError");

exports.addProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }
  const { productName, price, description, amount, ownerId } = req.body;
  if (!req.file) {
    throwBadRequestError("No image provided.");
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

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  let ownerId;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        throwNotFoundError("Product not found.");
      }
      ownerId = product.ownerId;

      return Product.findByIdAndDelete(productId);
    })
    .then((result) => {
      clearImage(result.imageUrl);
      return Owner.findById(ownerId);
    })
    .then((owner) => {
      if (!owner) {
        throwNotFoundError("Owner not found.");
      }
      if (!owner.product.includes(productId)) {
        throwNotFoundError("Product not found in owner.");
      }
      owner.product.pull(productId);
      return owner.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted product.", status: 200 });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  const { name, price, description, amount } = req.body;
  const imageUrl = req.file ? req.file.path.replace(/\\/g, "/") : null;

  if (!name || !price || !description || !amount) {
    throwValidationError("All fields must be filled.");
  }

  if (Number.isNaN(+price) || Number.isNaN(+amount)) {
    throwValidationError("Price and amount must be a number.");
  }

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        throwNotFoundError("Product not found.");
      }

      if (imageUrl !== product.imageUrl && imageUrl) {
        clearImage(product.imageUrl);
      }
      product.imageUrl = imageUrl ? imageUrl : product.imageUrl;
      product.name = name;
      product.price = +price;
      product.description = description;
      product.amount = +amount;
      return product.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Product updated!", status: 200 });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

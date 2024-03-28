"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductCategory = exports.updateProduct = exports.deleteProduct = exports.getProducts = exports.addProduct = void 0;
require("dotenv/config");
const Product_1 = __importDefault(require("../models/Product"));
const Owner_1 = __importDefault(require("../models/Owner"));
const express_validator_1 = require("express-validator");
const clearImage_1 = __importDefault(require("../utils/clearImage"));
const throwValidationError_1 = __importDefault(require("../utils/err/throwValidationError"));
const throwBadRequestError_1 = __importDefault(require("../utils/err/throwBadRequestError"));
const throwNotFoundError_1 = __importDefault(require("../utils/err/throwNotFoundError"));
const Order_1 = __importDefault(require("../models/Order"));
const FirebaseServices_1 = __importDefault(require("../utils/FirebaseServices"));
const mongoose_1 = require("mongoose");
const addProduct = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            (0, throwValidationError_1.default)("Validation failed, entered data is incorrect.");
        }
        const { productName, price, description, amount, ownerId, category } = req.body;
        if (!req.file) {
            return (0, throwBadRequestError_1.default)("No image provided.");
        }
        const downloadURL = await FirebaseServices_1.default.uploadImageToStorage(req.file, "products/");
        const product = new Product_1.default({
            name: productName,
            price: +price,
            description: description,
            imageUrl: downloadURL,
            amount: +amount,
            ownerId: ownerId,
            category: category,
        });
        const result = await product.save();
        const owner = await Owner_1.default.findById(ownerId);
        if (!owner) {
            return (0, throwNotFoundError_1.default)("Owner not found.");
        }
        owner.product.push(product._id);
        await owner.save();
        res.status(201).json({
            message: "Product created successfully!",
            product: result,
            status: 201,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.addProduct = addProduct;
const getProducts = (req, res, next) => {
    const ownerId = req.userId;
    Product_1.default.find({ ownerId: ownerId })
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
exports.getProducts = getProducts;
const deleteProduct = async (req, res, next) => {
    try {
        const productId = new mongoose_1.Types.ObjectId(req.params.productId);
        let ownerId;
        const product = await Product_1.default.findById(productId);
        if (!product) {
            return (0, throwNotFoundError_1.default)("Product not found.");
        }
        ownerId = product.ownerId;
        const fetchedOrders = await Order_1.default.find({ productsId: productId });
        const ordersHaveProductImage = fetchedOrders.filter((order) => order.orderImage === product.imageUrl);
        const result = await Product_1.default.findByIdAndDelete(productId);
        if (!result) {
            return (0, throwNotFoundError_1.default)("Product not found.");
        }
        if (!ordersHaveProductImage.length) {
            (0, clearImage_1.default)(result.imageUrl);
        }
        const owner = await Owner_1.default.findById(ownerId);
        if (!owner) {
            return (0, throwNotFoundError_1.default)("Owner not found.");
        }
        if (!owner.product.includes(productId)) {
            (0, throwNotFoundError_1.default)("Product not found in owner.");
        }
        owner.product.filter((prod) => prod.toString() !== productId.toString());
        await owner.save();
        res.status(200).json({ message: "Deleted product.", status: 200 });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.deleteProduct = deleteProduct;
const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const { name, price, description, amount } = req.body;
        if (!name || !price || !description || !amount) {
            return (0, throwValidationError_1.default)("All fields must be filled.");
        }
        if (Number.isNaN(+price) || Number.isNaN(+amount)) {
            return (0, throwValidationError_1.default)("Price and amount must be a number.");
        }
        const product = await Product_1.default.findById(productId);
        if (!product) {
            return (0, throwNotFoundError_1.default)("Product not found.");
        }
        const imageUrl = req.file
            ? await FirebaseServices_1.default.uploadImageToStorage(req.file, "products/")
            : product.imageUrl;
        if (imageUrl !== product.imageUrl && product.imageUrl) {
            FirebaseServices_1.default.deleteImageFromStorage(product.imageUrl);
        }
        product.imageUrl = imageUrl;
        product.name = name;
        product.price = +price;
        product.description = description;
        product.amount = +amount;
        product.category = product.category;
        await product.save();
        res.status(200).json({ message: "Product updated!", status: 200 });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.updateProduct = updateProduct;
const addProductCategory = (req, res, next) => {
    const { category, ownerId } = req.body;
    if (!category) {
        (0, throwValidationError_1.default)("Category must be filled.");
    }
    Owner_1.default.findById(ownerId)
        .then((owner) => {
        if (!owner) {
            return (0, throwNotFoundError_1.default)("Owner not found.");
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
exports.addProductCategory = addProductCategory;
//# sourceMappingURL=product.js.map
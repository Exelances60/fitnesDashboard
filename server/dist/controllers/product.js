"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.updateProduct = exports.deleteProduct = exports.getProducts = exports.addProduct = void 0;
require("dotenv/config");
const ProductServices_1 = require("../services/ProductServices");
const express_validator_1 = require("express-validator");
const printValidatorErrors_1 = require("../utils/printValidatorErrors");
const addProduct = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        (0, printValidatorErrors_1.printValidatorErrors)(errors);
        const result = await new ProductServices_1.ProductServices().createProduct(req);
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
const getProducts = async (req, res, next) => {
    try {
        const products = await new ProductServices_1.ProductServices().getProducts(req);
        res.status(200).json({
            message: "Fetched products successfully.",
            products: products,
            status: 200,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.getProducts = getProducts;
const deleteProduct = async (req, res, next) => {
    try {
        await new ProductServices_1.ProductServices().deleteProduct(req);
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
        const errors = (0, express_validator_1.validationResult)(req);
        (0, printValidatorErrors_1.printValidatorErrors)(errors);
        const product = await new ProductServices_1.ProductServices().updateProduct(req);
        res
            .status(200)
            .json({ message: "Product updated!", status: 200, product: product });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.updateProduct = updateProduct;
const getProduct = async (req, res, next) => {
    try {
        const product = await new ProductServices_1.ProductServices().getProduct(req);
        res.status(200).json({
            message: "Product fetched successfully.",
            product: product,
            status: 200,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.getProduct = getProduct;
//# sourceMappingURL=product.js.map
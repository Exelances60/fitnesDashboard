"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductCategory = exports.updateProduct = exports.deleteProduct = exports.getProducts = exports.addProduct = void 0;
require("dotenv/config");
const ProductServices_1 = require("../services/ProductServices");
const addProduct = async (req, res, next) => {
    try {
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
        await new ProductServices_1.ProductServices().updateProduct(req);
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
const addProductCategory = async (req, res, next) => {
    try {
        await new ProductServices_1.ProductServices().addProductCategory(req);
        res.status(201).json({
            message: "Category added successfully!",
            status: 201,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.addProductCategory = addProductCategory;
//# sourceMappingURL=product.js.map
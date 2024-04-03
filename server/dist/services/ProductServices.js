"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const ProductRepository_1 = require("../repository/ProductRepository");
const throwValidationError_1 = __importDefault(require("../utils/err/throwValidationError"));
const FirebaseServices_1 = __importDefault(require("../utils/FirebaseServices"));
const OwnerRepository_1 = require("../repository/OwnerRepository");
const throwBadRequestError_1 = __importDefault(require("../utils/err/throwBadRequestError"));
const throwNotFoundError_1 = __importDefault(require("../utils/err/throwNotFoundError"));
const OrderRepository_1 = require("../repository/OrderRepository");
class ProductServices {
    constructor() {
        this.productRepository = new ProductRepository_1.ProductRepository();
        this.ownerRepository = new OwnerRepository_1.OwnerRepository();
        this.orderRepository = new OrderRepository_1.OrderRepository();
    }
    async createProduct(req) {
        try {
            if (!req.file)
                return (0, throwValidationError_1.default)("Product image is required");
            const dowlandURL = await FirebaseServices_1.default.uploadImageToStorage(req.file, "products/");
            const product = await this.productRepository.create({
                ...req.body,
                name: req.body.productName,
                imageUrl: dowlandURL,
                price: +req.body.price,
                amount: +req.body.amount,
            });
            const owner = await this.ownerRepository.findById(req.body.ownerId);
            if (!owner)
                throw new Error("Owner not found");
            owner.product.push(product._id);
            await owner.updateOne(owner);
            return product;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getProducts(req) {
        try {
            if (!req.userId)
                return (0, throwBadRequestError_1.default)("User not found");
            const products = (await this.productRepository.find({
                ownerId: req.userId,
            }));
            return products;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteProduct(req) {
        try {
            const product = await this.productRepository.findById(req.params.productId);
            if (!product)
                return (0, throwNotFoundError_1.default)("Product not found");
            const owner = await this.ownerRepository.findById(product.ownerId.toString());
            if (!owner || !owner.product.includes(product._id))
                return (0, throwNotFoundError_1.default)("Owner not found");
            const fetchedOrders = await this.orderRepository.find({
                productId: product._id,
            });
            const ordersHaveProductImage = fetchedOrders.filter((order) => order.orderImage === product.imageUrl);
            const result = await this.productRepository.delete(product._id.toString());
            if (!result)
                return (0, throwNotFoundError_1.default)("Product not found");
            if (!ordersHaveProductImage.length) {
                await FirebaseServices_1.default.deleteImageFromStorage(product.imageUrl);
            }
            const filtredProduct = owner.product.filter((prod) => {
                return prod.toString() !== product._id.toString();
            });
            await owner.updateOne({
                product: filtredProduct,
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateProduct(req) {
        try {
            const { name, price, description, amount } = req.body;
            if (!name || !price || !description || !amount)
                return (0, throwValidationError_1.default)("All fields must be filled.");
            if (Number.isNaN(+price) || Number.isNaN(+amount))
                return (0, throwValidationError_1.default)("Price and amount must be a number.");
            const product = await this.productRepository.findById(req.params.productId);
            if (!product)
                return (0, throwNotFoundError_1.default)("Product not found.");
            const imageUrl = req.file
                ? await FirebaseServices_1.default.uploadImageToStorage(req.file, "products/")
                : product.imageUrl;
            if (imageUrl !== product.imageUrl && product.imageUrl) {
                FirebaseServices_1.default.deleteImageFromStorage(product.imageUrl);
            }
            await product.updateOne({
                ...req.body,
                imageUrl,
                price: +req.body.price,
                amount: +req.body.amount,
            });
            return product;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async addProductCategory(req) {
        try {
            if (!req.body.category)
                return (0, throwValidationError_1.default)("Category must be filled.");
            const owner = await this.ownerRepository.findById(req.body.ownerId);
            if (!owner)
                return (0, throwNotFoundError_1.default)("Owner not found.");
            owner.productCategory?.push(req.body.category);
            await owner.updateOne(owner);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.ProductServices = ProductServices;
//# sourceMappingURL=ProductServices.js.map
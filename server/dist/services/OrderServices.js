"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const OrderRepository_1 = require("../repository/OrderRepository");
const ProductRepository_1 = require("../repository/ProductRepository");
const throwNotFoundError_1 = __importDefault(require("../utils/err/throwNotFoundError"));
const OwnerRepository_1 = require("../repository/OwnerRepository");
class OrderServices {
    constructor() {
        this.orderRepository = new OrderRepository_1.OrderRepository();
        this.ownerRepository = new OwnerRepository_1.OwnerRepository();
        this.productRepository = new ProductRepository_1.ProductRepository();
    }
    async createOrder(req) {
        try {
            const product = await this.productRepository.findById(req.body.productId);
            if (!product)
                return (0, throwNotFoundError_1.default)("Product not found.");
            product.amount = product.amount - req.body.amount;
            await this.productRepository.update(req.body.productId, product);
            const totalPrice = (req.body.price * req.body.amount * 1.08).toFixed(2);
            const order = await this.orderRepository.create({
                totalPrice,
                orderOwnerEmail: req.body.email,
                adress: req.body.address,
                productsId: req.body.productId,
                status: "Preparing",
                orderImage: product.imageUrl,
                orderCategory: product.category,
                ...req.body,
            });
            const owner = await this.ownerRepository.findById(req.body.creator);
            if (!owner)
                return (0, throwNotFoundError_1.default)("Owner not found.");
            owner.orders.push(order._id);
            await this.ownerRepository.update(owner._id, owner);
            return order;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getOrders(req) {
        try {
            if (!req.userId)
                return (0, throwNotFoundError_1.default)("Owner not found.");
            const orders = await this.orderRepository.find({
                creator: req.userId,
            });
            if (!orders)
                return (0, throwNotFoundError_1.default)("Orders not found.");
            const productIds = orders.flatMap((order) => order.productsId);
            const products = await this.productRepository.find({
                _id: { $in: productIds },
            });
            if (!products)
                return (0, throwNotFoundError_1.default)("Products not found.");
            const ordersWithProducts = orders.map((order) => {
                const orderProducts = products.filter((product) => order.productsId.includes(product._id));
                return { ...order.toObject(), products: orderProducts };
            });
            const chartsData = ordersWithProducts.flatMap((order) => ({
                name: order.products.map((product) => product.name).join(", "),
                category: order.products
                    .map((product) => product.category)
                    .join(", "),
                price: order.products.reduce((acc, product) => acc + product.price, 0),
                amount: order.products.reduce((acc, product) => acc + product.amount, 0),
                totalPrice: order.totalPrice,
                amountOrder: order.amount,
                orderId: order._id,
                orderImages: order.products
                    .map((product) => product.imageUrl)
                    .join(", "),
            }));
            return { ordersWithProducts, chartsData };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateOrder(req) {
        try {
            const order = await this.orderRepository.update(req.body.params.orderId, req.body.data);
            if (!order)
                return (0, throwNotFoundError_1.default)("Order not found.");
            return order;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async orderCompleted(req) {
        try {
            const order = await this.orderRepository.findById(req.body.orderId);
            if (!order)
                return (0, throwNotFoundError_1.default)("Order not found.");
            if (order.status === "Completed")
                return (0, throwNotFoundError_1.default)("Order already completed.");
            order.status = "Completed";
            await this.orderRepository.update(order._id, order);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.OrderServices = OrderServices;
//# sourceMappingURL=OrderServices.js.map
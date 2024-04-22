import { Request } from "express";
import { IOrder } from "../models/Order";
import { IProduct } from "../models/Product";
import { OrderRepository } from "../repository/OrderRepository";
import { ProductRepository } from "../repository/ProductRepository";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import { OwnerRepository } from "../repository/OwnerRepository";
import { IOwner } from "../models/Owner";

export class OrderServices {
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;
  private ownerRepository: OwnerRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
    this.ownerRepository = new OwnerRepository();
    this.productRepository = new ProductRepository();
  }

  async createOrder(req: Request): Promise<IOrder> {
    try {
      const product = await this.productRepository.findById<IProduct>(
        req.body.productId
      );
      if (!product) return throwNotFoundError("Product not found.");
      product.amount = product.amount - req.body.amount;
      await this.productRepository.update<IProduct>(
        req.body.productId,
        product
      );
      const totalPrice = (req.body.price * req.body.amount * 1.08).toFixed(2);

      const order = await this.orderRepository.create<IOrder>({
        totalPrice,
        orderOwnerEmail: req.body.email,
        adress: req.body.address,
        productsId: req.body.productId,
        status: "Preparing",
        orderImage: product.imageUrl,
        orderCategory: product.category,
        ...req.body,
      });

      const owner = await this.ownerRepository.findById<IOwner>(
        req.body.creator
      );
      if (!owner) return throwNotFoundError("Owner not found.");
      owner.orders.push(order._id);
      await this.ownerRepository.update<IOwner>(owner._id, owner);
      return order;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getOrders(req: Request) {
    try {
      if (!req.userId) return throwNotFoundError("Owner not found.");
      const orders = await this.orderRepository.find({
        creator: req.userId,
      });
      if (!orders) return throwNotFoundError("Orders not found.");
      const productIds = orders.flatMap((order) => order.productsId);
      const products = await this.productRepository.find({
        _id: { $in: productIds },
      });
      if (!products) return throwNotFoundError("Products not found.");
      const ordersWithProducts = orders.map((order) => {
        const orderProducts = products.filter((product) =>
          order.productsId.includes(product._id)
        );
        return { ...order.toObject(), products: orderProducts };
      });
      const chartsData = ordersWithProducts.flatMap(
        (order: IOrder & { products: IProduct[] }) => ({
          name: order.products.map((product) => product.name).join(", "),
          category: order.products
            .map((product) => product.category)
            .join(", "),
          price: order.products.reduce(
            (acc, product) => acc + product.price,
            0
          ),
          amount: order.products.reduce(
            (acc, product) => acc + product.amount,
            0
          ),
          totalPrice: order.totalPrice,
          amountOrder: order.amount,
          orderId: order._id,
        })
      );

      return { ordersWithProducts, chartsData };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async updateOrder(req: Request): Promise<IOrder> {
    try {
      const order = await this.orderRepository.update<IOrder>(
        req.body.params.orderId,
        req.body.data
      );
      if (!order) return throwNotFoundError("Order not found.");
      return order;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async orderCompleted(req: Request) {
    try {
      const order = await this.orderRepository.findById<IOrder>(
        req.body.orderId
      );
      if (!order) return throwNotFoundError("Order not found.");
      if (order.status === "Completed")
        return throwNotFoundError("Order already completed.");
      order.status = "Completed";
      await this.orderRepository.update<IOrder>(order._id, order);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

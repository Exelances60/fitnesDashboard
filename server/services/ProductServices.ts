import { ProductRepository } from "../repository/ProductRepository";
import { Request } from "express";
import throwValidationError from "../utils/err/throwValidationError";
import firebaseStorageServices from "../utils/FirebaseServices";
import { OwnerRepository } from "../repository/OwnerRepository";
import { IOwner } from "../models/Owner";
import { IProduct } from "../models/Product";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import { OrderRepository } from "../repository/OrderRepository";
import { IUpdateProductRequest } from "../dto/ProductDTO";

export class ProductServices {
  private productRepository: ProductRepository;
  private ownerRepository: OwnerRepository;
  private orderRepository: OrderRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.ownerRepository = new OwnerRepository();
    this.orderRepository = new OrderRepository();
  }
  async createProduct(req: Request): Promise<IProduct> {
    try {
      if (!req.file) return throwValidationError("Product image is required");
      const dowlandURL = await firebaseStorageServices.uploadImageToStorage(
        req.file,
        "products/"
      );
      const product = await this.productRepository.create<IProduct>({
        ...req.body,
        name: req.body.productName,
        imageUrl: dowlandURL,
        price: +req.body.price,
        amount: +req.body.amount,
      });
      const owner = await this.ownerRepository.findById<IOwner>(
        req.body.ownerId
      );
      if (!owner) throw new Error("Owner not found");
      owner.product.push(product._id);
      await this.ownerRepository.update<IOwner>(owner._id, owner);
      return product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getProducts(req: Request): Promise<IProduct[]> {
    try {
      if (!req.userId) return throwBadRequestError("User not found");
      const products = (await this.productRepository.find({
        ownerId: req.userId,
      })) as IProduct[];
      return products;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async deleteProduct(req: Request): Promise<void> {
    try {
      const product = await this.productRepository.findById<IProduct>(
        req.params.productId
      );
      if (!product) return throwNotFoundError("Product not found");

      const owner = await this.ownerRepository.findById<IOwner>(
        product.ownerId.toString()
      );
      if (!owner || !owner.product.includes(product._id))
        return throwNotFoundError("Owner not found");

      const fetchedOrders = await this.orderRepository.find({
        productId: product._id,
      });

      const ordersHaveProductImage = fetchedOrders.filter(
        (order) => order.orderImage === product.imageUrl
      );

      const result = await this.productRepository.delete(product._id);

      if (!result) return throwNotFoundError("Product not found");
      if (!ordersHaveProductImage.length) {
        await firebaseStorageServices.deleteImageFromStorage(product.imageUrl);
      }
      const filtredProduct = owner.product.filter((prod) => {
        return prod.toString() !== product._id.toString();
      });

      await this.ownerRepository.update<IOwner>(owner._id, {
        product: filtredProduct,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async updateProduct(req: IUpdateProductRequest): Promise<IProduct> {
    try {
      const { name, price, description, amount } = req.body;
      if (!name || !price || !description || !amount)
        return throwValidationError("All fields must be filled.");
      if (Number.isNaN(+price) || Number.isNaN(+amount))
        return throwValidationError("Price and amount must be a number.");

      const product = await this.productRepository.findById<IProduct>(
        req.params.productId
      );
      if (!product) return throwNotFoundError("Product not found.");

      const imageUrl = req.file
        ? await firebaseStorageServices.uploadImageToStorage(
            req.file,
            "products/"
          )
        : product.imageUrl;
      if (imageUrl !== product.imageUrl && product.imageUrl) {
        firebaseStorageServices.deleteImageFromStorage(product.imageUrl);
      }

      await this.productRepository.update<IProduct>(product._id, {
        ...req.body,
        imageUrl,
        price: +req.body.price,
        amount: +req.body.amount,
      });

      return product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

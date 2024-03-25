import mongoose from "mongoose";
import { Product } from "../entities/Product";
import { IProductRepository } from "../interfaces/IProductRepository";
import db from "../services/DatabaseServices";

export class ProductRepository implements IProductRepository {
  private client: mongoose.Model<Product & mongoose.Document>;

  constructor(client: mongoose.Model<Product & mongoose.Document>) {
    this.client = client;
  }

  async create(data: Product): Promise<Product> {
    return await this.client.create(data);
  }
  async update(id: string, data: Product): Promise<Product> {
    return (await this.client.findByIdAndUpdate(id, data)) as Product;
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  addProductCategory(category: string, ownerId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

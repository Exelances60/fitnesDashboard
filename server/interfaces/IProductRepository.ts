import { Product } from "../entities/Product";

export interface IProductRepository {
  create(data: Product): Promise<Product>;
  update(id: string, data: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<Product>;
  getAll(): Promise<Product[]>;
  addProductCategory(category: string, ownerId: string): Promise<void>;
}

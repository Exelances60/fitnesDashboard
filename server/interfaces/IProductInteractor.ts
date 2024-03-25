import { Product } from "../entities/Product";

export interface IProductInteractor {
  addProduct(product: Product): Promise<Product>;
  updateProduct(productId: string, product: Product): Promise<Product>;
  deleteProduct(productId: string): Promise<void>;
  getProduct(productId: string): Promise<Product>;
  getProducts(): Promise<Product[]>;
  addProductCategory(category: string, ownerId: string): Promise<void>;
}

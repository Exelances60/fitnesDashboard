import { Product } from "../entities/Product";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { IProductRepository } from "../interfaces/IProductRepository";

export class ProductInteractor implements IProductInteractor {
  private repository: IProductRepository;
  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async addProduct(product: Product): Promise<Product> {
    return this.repository.create(product);
  }
  async updateProduct(productId: string, product: Product): Promise<Product> {
    return this.repository.update(productId, product);
  }
  async deleteProduct(productId: string): Promise<void> {
    return this.repository.delete(productId);
  }
  async getProduct(productId: string): Promise<Product> {
    return this.repository.get(productId);
  }
  async getProducts(): Promise<Product[]> {
    return this.repository.getAll();
  }
  async addProductCategory(category: string, ownerId: string): Promise<void> {
    return this.repository.addProductCategory(category, ownerId);
  }
}

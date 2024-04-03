import Product from "../models/Product";
import RepositoryBase from "./Repository";

export class ProductRepository extends RepositoryBase<typeof Product> {
  constructor() {
    super(Product);
  }
}

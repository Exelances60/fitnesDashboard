import Order from "../models/Order";
import RepositoryBase from "./Repository";

export class OrderRepository extends RepositoryBase<typeof Order> {
  constructor() {
    super(Order);
  }
}

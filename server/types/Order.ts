import { Types } from "mongoose";
import { IOrder } from "../models/Order";
import { IProduct } from "../models/Product";

export interface IOrderWithProducts extends IOrder {
  products: IProduct[];
}

export interface ISameMonth {
  month: string;
  total: number;
}

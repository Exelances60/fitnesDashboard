import { Request } from "express";

export interface IUpdateProductRequest extends Request {
  body: {
    name: string;
    description: string;
    price: string;
    amount: string;
  };
}

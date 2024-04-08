import { Request } from "express";

export interface IUpdateOwnerRequest extends Request {
  body: {
    companyName: string;
    address: string;
    phone: string;
    ownerImage: string;
    productCategory: string[];
    memberShipList: string[];
    memberShipPrice: number;
    memberShipMonths: number[];
  };
}

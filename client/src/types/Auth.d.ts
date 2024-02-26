import { Global } from "@/global";

export type jwtUserDecode = {
  email: string;
  ownerId: string;
  companyName: string;
  iat: number;
  exp: number;
  productCategory: string[];
  _id: string;
};
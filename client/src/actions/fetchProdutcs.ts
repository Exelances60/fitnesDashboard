"use server";
import { productsType } from "@/models/dataTypes";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const fetchProducts = async (): Promise<productsType[]> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return [];
  }
  const decodedToken = jwtDecode(token) as { _id: string };
  const response = await fetch(
    `http://localhost:8080/products/get-products/${decodedToken._id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.products;
};

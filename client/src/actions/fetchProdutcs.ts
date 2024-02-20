"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { productsType } from "@/types/Product";

export const fetchProducts = async (): Promise<productsType[]> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return [];
  }
  const decodedToken = jwtDecode(token) as { _id: string };
  try {
    const response = await fetch(
      `https://fitnesdashboard.onrender.com/products/get-products/${decodedToken._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data.products;
  } catch (error: any) {
    return [];
  }
};

"use server";
import { cookies } from "next/headers";

export const fetchProducts = async (): Promise<productsType[]> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return [];
  }
  try {
    const response = await fetch(
      `http://localhost:8080/products/get-products`,
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

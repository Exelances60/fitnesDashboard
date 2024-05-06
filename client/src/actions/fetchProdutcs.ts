"use server";
import { cookies } from "next/headers";

export const fetchProducts = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    throw new Error("Token not found");
  }
  try {
    const response = await fetch(
      `${process.env.BACK_END_SERVICES}/products/get-products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

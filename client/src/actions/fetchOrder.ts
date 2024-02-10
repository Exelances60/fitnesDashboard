"use server";
import { getOrdersType } from "@/models/dataTypes";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const fetchOrder = async (): Promise<getOrdersType> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return {
      orders: [],
      chartsData: [],
    };
  }
  const decodedToken = jwtDecode(token) as { _id: string };

  try {
    const response = await fetch(
      `http://localhost:8080/orders/get-orders/${decodedToken._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      orders: [],
      chartsData: [],
    };
  }
};

export default fetchOrder;

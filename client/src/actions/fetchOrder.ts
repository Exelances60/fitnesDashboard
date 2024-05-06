"use server";
import { cookies } from "next/headers";

const fetchOrder = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const response = await fetch(
      `${process.env.BACK_END_SERVICES}/orders/get-orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default fetchOrder;

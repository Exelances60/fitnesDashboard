"use server";
import { cookies } from "next/headers";

const fetchOrder = async (): Promise<getOrdersType> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return {
      orders: [],
      chartsData: [],
      cardData: {
        totalOrders: 0,
        totalSalesPrice: 0,
        increasePercentageForSales: 0,
        totalSalesCompleted: 0,
        increasePercentageForAmount: 0,
        increasePercentageForCompletedSales: 0,
      },
    };
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
    return {
      orders: [],
      chartsData: [],
      cardData: {
        totalOrders: 0,
        totalSalesPrice: 0,
        increasePercentageForSales: 0,
        totalSalesCompleted: 0,
        increasePercentageForAmount: 0,
        increasePercentageForCompletedSales: 0,
      },
      errorMessage: error.message,
    };
  }
};

export default fetchOrder;

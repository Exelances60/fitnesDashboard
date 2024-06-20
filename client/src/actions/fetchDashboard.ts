"use server";

import { cookies } from "next/headers";

export interface IDashboardCardResponse {
  error?: string;
  data?: {
    products: number;
    totalOrders: number;
    totalCompletedOrders: number;
    employees: number;
  };
}

export default async function fetchDashboard(): Promise<IDashboardCardResponse> {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return {
      error: "Token not found",
    };
  }
  try {
    const response = await fetch(`${process.env.BACK_END_SERVICES}/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.errorMessage);
    }
    const data = await response.json();
    return { data };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

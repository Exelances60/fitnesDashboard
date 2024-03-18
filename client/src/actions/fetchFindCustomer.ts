"use server";
import { cookies } from "next/headers";

export const fetchFindCustomer = async (customerId: string) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return [];
  }
  try {
    const response = await fetch(
      `${process.env.BACK_END_SERVICES}/customers/findcustomer/${customerId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch customer");
    }
    const { customer } = await response.json();
    return customer;
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
};

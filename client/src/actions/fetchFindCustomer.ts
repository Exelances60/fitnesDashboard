"use server";
import { cookies } from "next/headers";

export const fetchFindCustomer = async (customerId: string) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    throw new Error("Token not found");
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
      const message = await response.json();
      throw new Error(message.errorMessage);
    }
    const { customer } = await response.json();
    return customer;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

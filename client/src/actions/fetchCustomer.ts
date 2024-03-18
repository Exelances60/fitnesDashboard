"use server";
import { cookies } from "next/headers";

export const fetchCustomer = async (): Promise<CustomerType[] | []> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return [];
  }
  try {
    const response = await fetch(
      `${process.env.BACK_END_SERVICES}/customers/get-customer`,
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
    const { customers } = await response.json();
    return customers;
  } catch (error) {
    console.error(error);
    return [];
  }
};

"use server";
import { cookies } from "next/headers";

interface IPromiseCustomer {
  error: string;
  data: CustomerType[];
}

export const fetchCustomer = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return { error: "Token not found", data: [] };
  }
  try {
    const response = await fetch(
      `${process.env.BACK_END_SERVICES}/customers/get-customer`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }
    );
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.errorMessage);
    }
    const { customers } = await response.json();
    return { error: "", data: customers };
  } catch (error: any) {
    return { error: error.message };
  }
};

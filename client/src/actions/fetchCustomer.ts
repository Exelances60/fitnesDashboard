"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { CustomerType } from "@/types/Customer";

export const fetchCustomer = async (): Promise<CustomerType[] | []> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return [];
  }
  const decodedToken = jwtDecode(token) as { _id: string };
  try {
    const response = await fetch(
      `http://localhost:8080/customers/get-customer/${decodedToken._id}`,
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

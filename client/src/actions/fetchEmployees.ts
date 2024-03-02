"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const fetchEmplooyes = async (): Promise<IEmployee[]> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return [];
  }
  const decodedToken = jwtDecode(token) as { _id: string };
  try {
    const response = await fetch(
      `https://fitnesdashboard.onrender.com/employees/get-employees/${decodedToken._id}`,
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
    const { employees } = await response.json();
    return employees;
  } catch (error) {
    console.error(error);
    return [];
  }
};

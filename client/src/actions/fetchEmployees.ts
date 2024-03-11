"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const fetchEmplooyes = async (): Promise<IEmployeeFetchResponse> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return {
      employees: [],
      totalSalaryIncrease: 0,
      totalEmployeesCountIncarese: 0,
    };
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
    const { employees, totalSalaryIncrease, totalEmployeesCountIncarese } =
      await response.json();
    return { employees, totalSalaryIncrease, totalEmployeesCountIncarese };
  } catch (error) {
    console.error(error);
    return {
      employees: [],
      totalEmployeesCountIncarese: 0,
      totalSalaryIncrease: 0,
    };
  }
};

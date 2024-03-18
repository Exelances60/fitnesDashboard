"use server";
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
  try {
    const response = await fetch(
      `https://fitnesdashboard.onrender.com/employees/get-employees`,
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

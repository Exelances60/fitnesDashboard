"use server";
import { cookies } from "next/headers";

export const fetchEmplooyes = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    throw new Error("Token not found");
  }
  try {
    const response = await fetch(
      `${process.env.BACK_END_SERVICES}/employees/get-employees`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.errorMessage);
    }
    const { employees, totalSalaryIncrease, totalEmployeesCountIncarese } =
      await response.json();
    return {
      employees,
      totalSalaryIncrease,
      totalEmployeesCountIncarese,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

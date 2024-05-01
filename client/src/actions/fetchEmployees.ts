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
      `${process.env.BACK_END_SERVICES}/employees/get-employees`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    return {
      employees: [],
      totalEmployeesCountIncarese: 0,
      totalSalaryIncrease: 0,
      errorMessage: error.message,
    };
  }
};

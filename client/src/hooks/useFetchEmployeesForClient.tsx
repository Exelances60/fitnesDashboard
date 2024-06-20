import React, { useEffect, useState } from "react";
import { fetchEmplooyes } from "@/actions/fetchEmployees";

const useFetchEmployeesForClient = () => {
  const [employeeData, setEmployeeData] = useState<IEmployee[]>([]);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      const { employees } = await fetchEmplooyes();
      if (employees.length === 0) return { employees: [] };
      setEmployeeData(employees);
    };
    fetchEmployeeData();
  }, []);
  return { employeeData, setEmployeeData };
};

export default useFetchEmployeesForClient;

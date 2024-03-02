import React from "react";
import EmployeesContainer from "@/components/Employees/EmployeesContainer";
import { fetchEmplooyes } from "@/actions/fetchEmployees";

const EmployeesPage = async () => {
  const data = await fetchEmplooyes();
  return (
    <div>
      <EmployeesContainer employees={data} />
    </div>
  );
};

export default EmployeesPage;

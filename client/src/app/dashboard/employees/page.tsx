import React from "react";
import EmployeesContainer from "@/components/Employees/EmployeesContainer";
import { fetchEmplooyes } from "@/actions/fetchEmployees";

const EmployeesPage = async () => {
  const { employees, totalEmployeesCountIncarese } = await fetchEmplooyes();

  return (
    <div>
      <EmployeesContainer
        employees={employees}
        totalEmployeesCountIncarese={totalEmployeesCountIncarese}
      />
    </div>
  );
};

export default EmployeesPage;

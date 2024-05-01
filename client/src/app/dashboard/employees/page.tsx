import React from "react";
import EmployeesContainer from "@/components/Employees/EmployeesContainer";
import { fetchEmplooyes } from "@/actions/fetchEmployees";
import ErrorPage from "@/components/ErrorPage";

const EmployeesPage = async () => {
  const { employees, totalEmployeesCountIncarese, errorMessage } =
    await fetchEmplooyes();
  if (errorMessage) {
    return (
      <ErrorPage
        title="Failed to fetch employees"
        error={errorMessage}
        status="error"
      />
    );
  }

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

import React from "react";
import EmployeesContainer from "@/components/Employees/EmployeesContainer";
import { fetchEmplooyes } from "@/actions/fetchEmployees";
import Loading from "@/app/loading";

const EmployeesPage = async () => {
  const { employees, totalEmployeesCountIncarese } = await fetchEmplooyes();

  if (!employees) {
    return <Loading />;
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

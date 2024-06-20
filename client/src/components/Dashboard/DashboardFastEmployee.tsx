import useFetchEmployeesForClient from "@/hooks/useFetchEmployeesForClient";
import React from "react";
import EmployeesTable from "../Employees/EmployeesTable";
import { Spin } from "antd";

const DashboardFastEmployee = () => {
  const { employeeData, setEmployeeData } = useFetchEmployeesForClient();
  return (
    <Spin spinning={employeeData.length === 0}>
      <EmployeesTable
        employeeData={employeeData}
        setEmployeeData={setEmployeeData}
      />
    </Spin>
  );
};

export default DashboardFastEmployee;

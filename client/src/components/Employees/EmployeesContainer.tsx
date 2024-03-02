"use client";
import React, { useState } from "react";
import { Card } from "@tremor/react";
import { Button } from "antd";
import { useAppDispatch } from "@/store/store";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import DrawerFooterButton from "../DrawerFooterButton";
import EmployeesAddDrawer from "./EmployeesAddDrawer";
import EmployeesTable from "./EmployeesTable";

interface EmployeesContainerProps {
  employees: IEmployee[];
}

const EmployeesContainer = ({ employees }: EmployeesContainerProps) => {
  const [employeeData, setEmployeeData] = useState<IEmployee[]>(employees);
  const dispatch = useAppDispatch();

  const openAddDrawer = () => {
    dispatch(
      setShowDrawer({
        children: <EmployeesAddDrawer setEmployeeData={setEmployeeData} />,
        title: "Add Employee",
        footer: <DrawerFooterButton formName="addEmployeeForm" />,
      })
    );
  };

  return (
    <Card className="flex flex-col gap-2 overflow-auto" title="Employees">
      <div className="w-full flex justify-end">
        <Button type="default" color="blue" onClick={openAddDrawer}>
          Add Employee
        </Button>
      </div>
      <EmployeesTable employeeData={employeeData} />
    </Card>
  );
};

export default EmployeesContainer;
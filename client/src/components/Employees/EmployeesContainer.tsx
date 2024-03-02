"use client";
import React, { useState } from "react";
import { Card } from "@tremor/react";
import { Button, Table } from "antd";
import { useAppDispatch } from "@/store/store";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import DrawerFooterButton from "../DrawerFooterButton";
import EmployeesAddDrawer from "./EmployeesAddDrawer";

interface EmployeesContainerProps {
  employees: IEmployee[];
}

const EmployeesContainer = ({ employees }: EmployeesContainerProps) => {
  const [employeeData, setEmployeeData] = useState<IEmployee[]>(employees);
  const dispatch = useAppDispatch();

  const openModal = () => {
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
        <Button type="default" color="blue" onClick={openModal}>
          Add Employee
        </Button>
      </div>
      <Table
        dataSource={employeeData}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        className="overflow-auto"
      >
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Position" dataIndex="position" key="position" />
        <Table.Column title="Phone" dataIndex="phone" key="phone" />
        <Table.Column title="Actions" dataIndex="actions" key="actions" />
      </Table>
    </Card>
  );
};

export default EmployeesContainer;

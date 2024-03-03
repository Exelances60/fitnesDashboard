import { Form } from "antd";
import React from "react";
import EmployeesAddForm from "../EmployeesAddForm";

interface EmployeesEditModalProps {
  employee: IEmployee;
}

const EmployeesEditModal = ({ employee }: EmployeesEditModalProps) => {
  return (
    <Form
      layout="vertical"
      initialValues={{
        ...employee,
        hireDate: new Date(employee.hireDate || "").toISOString().split("T")[0],
      }}
      id="editEmployeeForm"
    >
      <EmployeesAddForm editMode={true} employee={employee} />
    </Form>
  );
};

export default EmployeesEditModal;

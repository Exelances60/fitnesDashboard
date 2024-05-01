import { Form, message } from "antd";
import React from "react";
import EmployeesAddForm from "../EmployeesAddForm";
import axiosClient from "@/utils/AxiosClient";
import { useAppDispatch } from "@/store/store";
import { setHideDrawer } from "@/store/slices/drawerSlice";

interface EmployeesEditModalProps {
  employee: IEmployee;
  setEmployeeData: React.Dispatch<React.SetStateAction<IEmployee[]>>;
}

const EmployeesEditModal = ({
  employee,
  setEmployeeData,
}: EmployeesEditModalProps) => {
  const dispatch = useAppDispatch();
  const onFinish = async (values: IEmployee) => {
    message.info({ content: "Updating employee", key: "updateEmployee" });

    try {
      const response = await axiosClient.put(`/employees/update-employee/`, {
        ...values,
        id: employee._id,
        phone: values.phone ? +values.phone : undefined,
      });
      if (response.status === 200) {
        message.success({
          content: "Employee updated successfully",
          key: "updateEmployee",
        });
        setEmployeeData((prev) => {
          return prev.map((emp) => {
            if (emp._id === employee._id) {
              return { ...emp, ...values, salary: +values.salary };
            }
            return emp;
          });
        });
        dispatch(setHideDrawer());
      }
    } catch (error: any) {
      message.error({
        content: `${error.response.data.errorMessage}`,
        key: "updateEmployee",
      });
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
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

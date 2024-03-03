import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import axiosClient from "@/utils/AxiosClient";
import { Form, message } from "antd";
import React from "react";
import EmployeesAddForm from "./EmployeesAddForm";

interface EmployeesAddDrawerProps {
  setEmployeeData: React.Dispatch<React.SetStateAction<IEmployee[]>>;
}

const EmployeesAddDrawer = ({ setEmployeeData }: EmployeesAddDrawerProps) => {
  const [form] = Form.useForm();
  const userInfo = useSelectUserInfo();

  const onFinish = async (values: any) => {
    if (!userInfo) return;
    message.loading({ content: "Loading...", key: "addEmployee" });
    const profilePicture = values.profilePicture.fileList[0].originFileObj;
    const documents = values.documents.fileList.map(
      (file: any) => file.originFileObj
    );
    const newValues = { ...values, profilePicture, documents };
    const formData = new FormData();
    formData.append("profilePicture", newValues.profilePicture);
    if (newValues.documents && newValues.documents.length > 0) {
      newValues.documents.forEach((document: any) => {
        formData.append("documents", document);
      });
    }
    formData.append("name", newValues.name);
    formData.append("phone", newValues.phone);
    formData.append("email", newValues.email);
    formData.append("age", newValues.age);
    formData.append("position", newValues.position);
    formData.append("address", newValues.address);
    formData.append("hireDate", newValues.hireDate);
    formData.append("salary", newValues.salary);
    formData.append("university", newValues.university);
    formData.append("education", newValues.education);
    formData.append("ownerId", userInfo._id);

    try {
      const response = await axiosClient.postForm(
        "/employees/create-employee",
        formData
      );
      if (response.status === 201) {
        console.log(response.data);
        message.success({
          content: "Employee added successfully",
          key: "addEmployee",
        });
        setEmployeeData((prev) => [...prev, response.data.savedEmployee]);
        form.resetFields();
      }
    } catch (error) {
      message.error({ content: "Error", key: "addEmployee" });
    }
  };

  return (
    <div>
      <Form
        name="addEmployeeForm"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <EmployeesAddForm />
      </Form>
    </div>
  );
};

export default EmployeesAddDrawer;

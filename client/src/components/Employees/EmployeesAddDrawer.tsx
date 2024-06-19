import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import axiosClient from "@/utils/AxiosClient";
import { Form, message, Spin } from "antd";
import React, { useState } from "react";
import EmployeesAddForm from "./EmployeesAddForm";
import useMessage from "@/hooks/useMessage";

interface EmployeesAddDrawerProps {
  setEmployeeData: React.Dispatch<React.SetStateAction<IEmployee[]>>;
}
const EmployeesAddDrawer = ({ setEmployeeData }: EmployeesAddDrawerProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const userInfo = useSelectUserInfo();
  const showMessage = useMessage();

  const onFinish = async (values: any) => {
    setLoading(true);
    if (!userInfo) return;
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
        showMessage("Employee added successfully", "success");
        setEmployeeData((prev) => [...prev, response.data.savedEmployee]);
        form.resetFields();
      }
    } catch (error: any) {
      message.error({ content: error.response.data.message, key: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Spin spinning={loading} tip="Adding Employee...">
        <Form
          name="addEmployeeForm"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <EmployeesAddForm editMode={false} />
        </Form>
      </Spin>
    </div>
  );
};

export default EmployeesAddDrawer;

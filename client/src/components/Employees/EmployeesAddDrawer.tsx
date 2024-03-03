import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import { allUniverstyList } from "@/mock/allUniverstyList";
import axiosClient from "@/utils/AxiosClient";
import {
  emailRules,
  employeeMinAge,
  justRequired,
  maxAge,
  phoneRules,
} from "@/utils/FormRules";
import { Form, Input, Select, Upload, message } from "antd";
import {
  MailOutlined,
  UserOutlined,
  EuroCircleOutlined,
} from "@ant-design/icons";
import React from "react";

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
        <Form.Item label="Profile Picture" name="profilePicture">
          <Upload name="profilePicture" listType="picture-card" maxCount={1}>
            <div>
              <div>+</div>
            </div>
          </Upload>
        </Form.Item>
        <div className="flex gap-2">
          <Form.Item
            label="Name"
            name="name"
            required
            className="w-full"
            rules={[...justRequired, { min: 3, message: "Min 3 characters" }]}
          >
            <Input type="text" addonBefore={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            required
            className="w-full"
            rules={phoneRules}
          >
            <Input type="text" addonBefore="+90" />
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <Form.Item
            label="Email"
            name="email"
            required
            rules={emailRules}
            className="w-full"
          >
            <Input type="text" addonBefore={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            required
            rules={[...justRequired, ...maxAge, ...employeeMinAge]}
            className="w-full"
          >
            <Input type="number" />
          </Form.Item>
        </div>
        <Form.Item
          label="Position"
          name="position"
          required
          rules={justRequired}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Address" name="address" required rules={justRequired}>
          <Input.TextArea />
        </Form.Item>
        <div className="flex gap-2">
          <Form.Item
            label="Hire Date"
            name="hireDate"
            required
            rules={justRequired}
            className="w-full"
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            required
            rules={justRequired}
            className="w-full"
          >
            <Input
              type="number"
              suffix="TL"
              addonBefore={<EuroCircleOutlined />}
            />
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <Form.Item
            label="University"
            name="university"
            required
            className="w-full"
            rules={justRequired}
          >
            <Select showSearch>
              <Select.Option value="">Not Select</Select.Option>
              {allUniverstyList.map((university) => {
                return (
                  <Select.Option key={university.No} value={university.Adı}>
                    {university.Adı}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Education"
            name="education"
            required
            className="w-full"
            rules={justRequired}
          >
            <Select>
              <Select.Option value="ilkokul">İlkokul</Select.Option>
              <Select.Option value="ortaokul">Ortaokul</Select.Option>
              <Select.Option value="lise">Lise</Select.Option>
              <Select.Option value="önlisans">Ön Lisans</Select.Option>
              <Select.Option value="yüksekLisans">Yüksek Lisans</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          label="Documents"
          name="documents"
          required
          rules={justRequired}
          className="w-full"
        >
          <Upload name="documents" listType="picture-card" maxCount={6}>
            <div>
              <div>+</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmployeesAddDrawer;

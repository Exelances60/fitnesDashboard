import React, { ReactNode, useState } from "react";
import { Form, Input, Select, Space, Button, Divider, Upload } from "antd";
import * as Icon from "@ant-design/icons";
import { addCustomerFormType } from "@/models/dataTypes";
import useMessage from "@/hooks/useMessage";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import axiosClient from "@/utils/AxiosClient";

const CustomerAddModal = () => {
  const [form] = Form.useForm();
  const [vipStatus, setVipStatus] = useState(false);
  const [image, setImage] = useState<any>(null);
  const userInfo = useSelectUserInfo();
  const showMessage = useMessage();

  const renderFormItem = (
    label: string,
    name: string,
    placeholder: string,
    type: string,
    addonBefore: ReactNode | string | null
  ) => (
    <Form.Item
      label={label}
      name={name}
      className="w-full"
      rules={[
        { required: true, message: `${label} is required or too short` },
        { min: 1, message: `${label} is required or too short` },
      ]}
    >
      <Input placeholder={placeholder} type={type} addonBefore={addonBefore} />
    </Form.Item>
  );

  const onFinish = async (values: addCustomerFormType) => {
    if (!userInfo) return;
    showMessage("Adding Customer", "loading", 1);
    console.log(values);

    const formData = new FormData();
    if (image) {
      formData.append("profilePicture", image);
    }
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("age", values.age.toString());
    formData.append("bodyWeight", values.bodyWeight.toString());
    formData.append("height", values.height.toString());
    formData.append("membershipMonths", values.membershipMonths.toString());
    formData.append("membershipPrice", values.membershipPrice.toString());
    formData.append("membershipStatus", values.membershipStatus);
    formData.append("ownerId", userInfo?._id);
    if (values.coach) {
      formData.append("coach", values.coach);
    }
    try {
      const response = await axiosClient.postForm(
        "/customers/add-customer",
        formData
      );
      if (response.status === 201) {
        showMessage("Customer Added", "success", 3);
        form.resetFields();
      }
    } catch (error) {
      showMessage("Failed to add customer", "error", 3);
    }
  };

  return (
    <Form
      layout="vertical"
      id="customerAddForm"
      className="w-full flex flex-col gap-[10px] justify-center"
      form={form}
      encType="multipart/form-data"
      onFinish={onFinish}
    >
      <Form.Item
        label="Profile Picture"
        name="profilePicture"
        valuePropName="fileList"
        className="w-full flex flex-col gap-[10px] justify-center"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        }}
      >
        <Upload
          name="profilePicture"
          listType="picture-card"
          maxCount={1}
          onChange={(info: any) => setImage(info.file.originFileObj)}
        >
          <Button icon={<Icon.UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <div className="flex gap-4">
        {renderFormItem("Name", "name", "Enter Name", "text", null)}
        {renderFormItem("Phone", "phone", "Enter Phone", "tel", "+90")}
      </div>
      <div className="flex gap-4">
        {renderFormItem(
          "Email",
          "email",
          "Enter Email",
          "email",
          <Icon.MailOutlined />
        )}
        {renderFormItem(
          "Age",
          "age",
          "Enter Age",
          "number",
          <Icon.UserOutlined />
        )}
      </div>
      <div className="flex gap-4">
        {renderFormItem(
          "Body Weight",
          "bodyWeight",
          "Enter Body Weight",
          "number",
          "kg"
        )}
        {renderFormItem("Height", "height", "Enter Height", "number", "cm")}
      </div>
      <Form.Item
        label="Membership Months"
        name="membershipMonths"
        rules={[
          {
            required: true,
            message: "Membership Months is required",
          },
        ]}
      >
        <Select
          onChange={(value) => {
            if (value === "1") {
              form.setFieldsValue({ membershipPrice: 700 });
            }
            if (value === "3") {
              form.setFieldsValue({ membershipPrice: 1800 });
            }
            if (value === "6") {
              form.setFieldsValue({ membershipPrice: 3400 });
            }
            if (value === "12") {
              form.setFieldsValue({ membershipPrice: 6000 });
            }
          }}
          placeholder="Select a membership price"
          showSearch
          options={[
            { label: "1 Month", value: "1" },
            { label: "3 Months", value: "3" },
            { label: "6 Months", value: "6" },
            { label: "12 Months", value: "12" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Membership Price" name="membershipPrice">
        <Input placeholder="Enter Price" addonBefore="₺" />
      </Form.Item>
      <Form.Item
        label="Membership Status"
        name="membershipStatus"
        rules={[
          {
            required: true,
            message: "Membership Status is required",
          },
        ]}
      >
        <Select
          placeholder="Select a membership status"
          dropdownRender={(menu) => {
            return (
              <div>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<Icon.PlusOutlined />}>
                    Add item
                  </Button>
                </Space>
              </div>
            );
          }}
          onChange={(value) => {
            if (value !== "vip") {
              return setVipStatus(false);
            }
            return setVipStatus(true);
          }}
        >
          <Select.Option value="standart">Standart</Select.Option>
          <Select.Option value="passive">Passive</Select.Option>
          <Select.Option value="vip">VIP</Select.Option>
        </Select>
      </Form.Item>

      {vipStatus ? (
        <Form.Item label="Coach" name="coach">
          <Select placeholder="Select a coach">
            {["coach1", "coach2", "coach3"].map((coachNumber) => (
              <Select.Option key={coachNumber} value={coachNumber}>
                {coachNumber}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      ) : null}

      <Form.Item
        label="Gender"
        name="gender"
        rules={[
          {
            required: true,
            message: "Please select",
          },
        ]}
      >
        <Select
          placeholder="Select"
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
          ]}
        />
      </Form.Item>
    </Form>
  );
};

export default CustomerAddModal;

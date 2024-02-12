import React, { ReactNode, useState } from "react";
import { Form, Input, Select, Space, Button, Divider, Upload } from "antd";
import * as Icon from "@ant-design/icons";
import { addCustomerFormType } from "@/models/dataTypes";

const CustomerAddModal = () => {
  const [form] = Form.useForm();
  const [vipStatus, setVipStatus] = useState(false);

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

  const onFinish = (values: addCustomerFormType) => {
    console.log("Success:", values);
    try {
    } catch (error) {}
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
        <Upload name="profilePicture" listType="picture-card" maxCount={1}>
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
            form.setFieldsValue({
              membershipPrice: value,
            });
          }}
          placeholder="Select a membership price"
          showSearch
          options={[
            { label: "1 Month", value: 700 },
            { label: "3 Month", value: 2100 },
            { label: "6 Month", value: 4200 },
            { label: "12 Month", value: 8400 },
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
            {[1, 2, 3, 4].map((coachNumber) => (
              <Select.Option key={coachNumber} value={coachNumber}>
                Coach {coachNumber}
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

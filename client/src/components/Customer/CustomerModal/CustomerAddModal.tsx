import React, { useState } from "react";
import { Form, Input, Select, Button, Upload } from "antd";
import * as Icon from "@ant-design/icons";
import useMessage from "@/hooks/useMessage";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import axiosClient from "@/utils/AxiosClient";
import CustomerMemberShipStatus from "./CustomerMemberShipStatus";
import CustomerAddAge from "./CustomerAddAge";
import { renderFormItem } from "@/utils/renderForTables/Customers/renderCustomerFormItem";
import { justRequired, maxBodyWeight, maxHeight } from "@/utils/FormRules";

const CustomerAddModal = () => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<any>(null);
  const userInfo = useSelectUserInfo();
  const showMessage = useMessage();

  const onFinish = async (values: AddCustomerFormType) => {
    if (!userInfo) return;
    showMessage("Adding Customer", "loading", 1);

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
    formData.append("address", values.address);
    if (values.parentPhone) {
      formData.append("parentPhone", values.parentPhone);
    }
    if (values.coach) {
      formData.append("coach", values.coach);
    }
    formData.append("bloodGroup", values.bloodGroup);

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
      <CustomerAddAge />
      <div className="flex gap-4">
        <Form.Item
          label="Body Weight"
          name="bodyWeight"
          className="w-full"
          rules={[...justRequired, ...maxBodyWeight]}
        >
          <Input placeholder="Enter Weight" type="number" addonBefore="kg" />
        </Form.Item>
        <Form.Item
          label="Height"
          name="height"
          className="w-full"
          rules={[...justRequired, ...maxHeight]}
        >
          <Input placeholder="Enter Height" type="number" addonBefore="cm" />
        </Form.Item>
      </div>
      {renderFormItem(
        "Address",
        "address",
        "Enter Address",
        "text",
        <Icon.EnvironmentOutlined />
      )}
      <Form.Item label="Blood Type" name="bloodGroup" rules={justRequired}>
        <Select
          placeholder="Select"
          options={[
            { label: "A Rh+", value: "A Rh+" },
            { label: "A Rh-", value: "A Rh-" },
            { label: "B Rh+", value: "B Rh+" },
            { label: "B Rh-", value: "B Rh-" },
            { label: "AB Rh+", value: "AB Rh+" },
            { label: "AB Rh-", value: "AB Rh-" },
            { label: "0 Rh+", value: "0 Rh+" },
            { label: "0 Rh-", value: "0 Rh-" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Membership Months"
        name="membershipMonths"
        rules={justRequired}
      >
        <Select
          onChange={(value) => {
            const membershipPrice = userInfo?.memberShipPrice
              ? userInfo.memberShipPrice
              : 0;
            form.setFieldsValue({
              membershipPrice: +value * +membershipPrice,
            });
          }}
          placeholder="Select a membership price"
          showSearch
        >
          {userInfo?.memberShipMonths?.map((memberShip, index) => (
            <Select.Option key={index} value={memberShip}>
              {memberShip} Month
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Membership Price" name="membershipPrice">
        <Input placeholder="Enter Price" addonBefore="₺" />
      </Form.Item>
      <CustomerMemberShipStatus />
      <Form.Item label="Gender" name="gender" rules={justRequired}>
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

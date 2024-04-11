import React from "react";
import { Form, Input, Divider, InputNumber } from "antd";
import { MailOutlined } from "@ant-design/icons";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import axiosClient from "@/utils/AxiosClient";
import useMessage from "@/hooks/useMessage";
import { useAppDispatch } from "@/store/store";
import { setHideDrawer } from "@/store/slices/drawerSlice";
import CustomerMemberShipStatus from "../CustomerModal/CustomerMemberShipStatus";

interface CustomerEditDrawerProps {
  customer: CustomerType;
}

const CustomerEditDrawer = ({ customer }: CustomerEditDrawerProps) => {
  const userInfo = useSelectUserInfo();
  const [form] = Form.useForm();
  const showMessage = useMessage();
  const dispatch = useAppDispatch();

  const onFinish = async (values: UpdateCustomerFormType) => {
    if (!userInfo) return;
    showMessage("Updating customer", "loading", 2);

    const updatedCustomer = {
      ...values,
      /*     exercisePlan: values.exercisePlan, */
      membershipType: values.membershipMonths,
      age: +values.age,
    };
    try {
      const response = await axiosClient.put("/customers/update-customer", {
        ...updatedCustomer,
        _id: customer._id,
        ownerId: userInfo._id,
      });
      if (response.status === 200) {
        showMessage("Customer updated successfully", "success", 2);
        form.resetFields();
        dispatch(setHideDrawer());
      }
    } catch (error) {
      showMessage("Error occured while updating customer", "error", 2);
    }
  };

  return (
    <>
      <Form
        form={form}
        className="w-full"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...customer,
          membershipMonths: customer.membershipType,
        }}
        id="editCustomerForm"
      >
        <label className="font-bold">Personal Information</label>
        <div className="flex gap-5 mt-2">
          <Form.Item label="Name" name="name" className="w-full">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" className="w-full">
            <Input addonBefore={<MailOutlined />} />
          </Form.Item>
          <Form.Item label="Phone" name="phone" className="w-full">
            <Input addonBefore="+90" />
          </Form.Item>
        </div>
        <Divider />
        <label className="font-bold">Physical Information</label>
        <div className="flex gap-5">
          <Form.Item label="Age" name="age" className="w-full">
            <Input />
          </Form.Item>
          <Form.Item label="Body Weight" name="bodyWeight" className="w-full">
            <Input addonBefore="kg" />
          </Form.Item>
          <Form.Item label="Height" name="height" className="w-full">
            <Input addonBefore="cm" />
          </Form.Item>
        </div>
        <Divider />
        <label className="font-bold">Membership Information</label>
        <div className="flex gap-5">
          <Form.Item
            label="Membership Months"
            name="membershipMonths"
            className="w-full"
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Membership Price"
            name="membershipPrice"
            className="w-full"
          >
            <InputNumber />
          </Form.Item>
          <CustomerMemberShipStatus editMode={true} />
        </div>
        {/* 
        <CustomerEditExersiceForm /> */}
      </Form>
    </>
  );
};

export default CustomerEditDrawer;

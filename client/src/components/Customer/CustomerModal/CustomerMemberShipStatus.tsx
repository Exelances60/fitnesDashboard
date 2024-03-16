import React from "react";
import { Form, Select } from "antd";
import useGetUserInfo from "@/hooks/useGetUserInfo";

interface ICustomerMemberShipStatus {
  editMode?: boolean;
}

const CustomerMemberShipStatus = ({ editMode }: ICustomerMemberShipStatus) => {
  const userInfo = useGetUserInfo();
  return (
    <>
      <Form.Item
        label="Membership Status"
        name="membershipStatus"
        className={editMode ? "w-full" : ""}
        rules={[
          {
            required: true,
            message: "Membership Status is required",
          },
        ]}
      >
        <Select placeholder="Select a membership status">
          {userInfo?.memberShipList?.map((memberShip, index) => (
            <Select.Option key={index} value={memberShip}>
              {memberShip}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default CustomerMemberShipStatus;

import React from "react";
import { Form, Select } from "antd";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";

interface ICustomerMemberShipStatus {
  editMode?: boolean;
}

const CustomerMemberShipStatus = ({ editMode }: ICustomerMemberShipStatus) => {
  const userInfo = useSelectUserInfo();
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

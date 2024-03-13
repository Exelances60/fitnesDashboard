import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { fetchOwnerInfo } from "@/actions/fetchOwnerInfo";
import { ProgressCircle } from "@tremor/react";

const CustomerMemberShipStatus = () => {
  const [userInfo, setUserInfo] = useState<OwnerType | null>(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetchOwnerInfo();
      setUserInfo(response.owner);
    };
    fetchUserInfo();
  }, []);

  if (!userInfo) return <ProgressCircle />;

  return (
    <>
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

import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { fetchOwnerInfo } from "@/actions/fetchOwnerInfo";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserInfo, setUserInfoRedux } from "@/store/slices/userSlice";

interface ICustomerMemberShipStatus {
  editMode?: boolean;
}

const CustomerMemberShipStatus = ({ editMode }: ICustomerMemberShipStatus) => {
  const [userInfo, setUserInfo] = useState<OwnerType | null>(null);
  const dispatch = useAppDispatch();
  const userInfoRedux = useAppSelector(selectUserInfo);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userInfoRedux) {
        return setUserInfo(userInfoRedux);
      } else {
        const response = await fetchOwnerInfo();
        setUserInfo(response?.owner);
        dispatch(setUserInfoRedux(response?.owner));
      }
    };
    fetchUserInfo();
  }, [userInfoRedux, dispatch]);

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

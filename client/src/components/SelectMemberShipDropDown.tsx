import React, { useState } from "react";
import { Button, Input, Divider, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosClient from "@/utils/AxiosClient";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";

interface SelectMemberShipDropDownProps {
  menu: JSX.Element | string;
  setMemberShipList: React.Dispatch<React.SetStateAction<string[]>>;
  memberShipList: string[];
  settingPage: boolean;
}

const SelectMemberShipDropDown = ({
  menu,
  setMemberShipList,
  memberShipList,
  settingPage,
}: SelectMemberShipDropDownProps) => {
  const userInfo = useSelectUserInfo();
  const [memberShip, setMemberShip] = useState<string>("");

  const onMemberShipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemberShip(event.target.value);
  };

  const addItem = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (memberShip === undefined) return;
    message.loading({ content: "Adding MemberShip", key: "category" });
    setMemberShipList((prev) => [...prev, memberShip]);
    setMemberShip("");

    try {
      const resposne = await axiosClient.post(
        "/auth/add-owner-membershipList",
        {
          memberShipList: memberShipList,
          ownerId: userInfo?._id,
        }
      );
      if (resposne.status === 201) {
        message.success({ content: "Category Added", key: "category" });
      }
    } catch (error) {
      message.error({ content: "Some error pls try again", key: "category" });
    }
  };
  return (
    <div>
      {menu}
      {settingPage ? (
        <>
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Please enter item"
              onKeyDown={(e) => e.stopPropagation()}
              value={memberShip}
              onChange={onMemberShipChange}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      ) : null}
    </div>
  );
};

export default SelectMemberShipDropDown;

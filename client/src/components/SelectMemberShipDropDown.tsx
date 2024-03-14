import React, { useState } from "react";
import { Button, Input, Divider, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface SelectDropDownAddItemProps {
  menu: JSX.Element | string;
  setState: any;
  sendedState: string[] | number[];
  settingPage: boolean;
}

const SelectDropDownAddItem = ({
  menu,
  setState,
  sendedState,
  settingPage,
}: SelectDropDownAddItemProps) => {
  const [memberShip, setMemberShip] = useState<string>("");

  const onMemberShipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemberShip(event.target.value);
  };

  const addItem = () => {
    if (memberShip.length < 1) {
      message.error("Please enter item");
      return;
    }
    setState([...sendedState, memberShip]);
    setMemberShip("");
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

export default SelectDropDownAddItem;

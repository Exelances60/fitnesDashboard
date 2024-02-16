import React, { useState } from "react";
import * as Icon from "@ant-design/icons";
import { Form, Select, Input, Divider, Space, Button } from "antd";

const CustomerMemberShipStatus = () => {
  const [vipStatus, setVipStatus] = useState(false);
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
    </>
  );
};

export default CustomerMemberShipStatus;

import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import {
  emailRules,
  justRequired,
  maxPrice,
  minAmount,
  phoneRules,
} from "@/utils/FormRules";
import SelectCategoryDropDown from "../SelectCategoryDropDown";
import SelectDropDownAddItem from "../SelectMemberShipDropDown";

interface SettingUpdateFormItemsProps {
  categoryList: string[];
  setCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
  memberShipList: string[];
  setMemberShipList: React.Dispatch<React.SetStateAction<string[]>>;
}

const SettingUpdateFormItems = ({
  categoryList,
  memberShipList,
  setCategoryList,
  setMemberShipList,
}: SettingUpdateFormItemsProps) => {
  const [membershipMonths, setMembershipMonths] = useState<number[]>([]);

  return (
    <>
      <Form.Item
        name="companyName"
        label="Company Name"
        rules={[...justRequired]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[...emailRules]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[...phoneRules]}>
        <Input type="tel" />
      </Form.Item>
      <Form.Item label="Address" name="address">
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Product Category" name="productCategory">
        <Select
          placeholder="Select a category"
          mode="multiple"
          style={{ width: "100%" }}
          dropdownRender={(menu) => (
            <SelectCategoryDropDown
              menu={menu}
              setCategoryList={setCategoryList}
              categoryList={categoryList}
              editable={true}
            />
          )}
        >
          {categoryList.map((category) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Memembership Type"
        name="memberShipList"
        rules={[...justRequired]}
      >
        <Select
          placeholder="Enter the membership"
          allowClear
          style={{ width: "100%" }}
          mode="multiple"
          value={memberShipList}
          dropdownRender={(menu) => (
            <SelectDropDownAddItem
              menu={menu}
              setState={setMemberShipList}
              sendedState={memberShipList}
              settingPage={true}
            />
          )}
        >
          {memberShipList.map((memberShip) => (
            <Select.Option key={memberShip} value={memberShip}>
              {memberShip}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Membership Price a one month"
        name="memberShipPrice"
        rules={[...minAmount, ...maxPrice, ...justRequired]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Membership Months,just enter the number "
        name="memberShipMonths"
        normalize={(value) => {
          return value.map((month: string) => parseInt(month));
        }}
      >
        <Select
          placeholder="Select a membership price"
          style={{ width: "100%" }}
          mode="multiple"
          dropdownRender={(menu) => (
            <SelectDropDownAddItem
              menu={menu}
              setState={setMembershipMonths}
              sendedState={membershipMonths}
              settingPage={true}
            />
          )}
        >
          {membershipMonths.map((month) => (
            <Select.Option key={month} value={month}>
              {month} Months
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Save Settings
      </Button>
    </>
  );
};

export default SettingUpdateFormItems;

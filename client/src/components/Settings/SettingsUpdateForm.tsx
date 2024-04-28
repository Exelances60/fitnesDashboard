"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { Divider } from "@tremor/react";
import { motion } from "framer-motion";
import { formDisableAnimation } from "@/utils/utils";
import SelectCategoryDropDown from "../SelectCategoryDropDown";
import SelectDropDownAddItem from "../SelectMemberShipDropDown";
import {
  emailRules,
  justRequired,
  maxPrice,
  minAmount,
  phoneRules,
} from "@/utils/FormRules";
import axiosClient from "@/utils/AxiosClient";

interface SettingUpdateFormProps {
  ownerInfo: OwnerType;
  setOwnerInfoState: React.Dispatch<React.SetStateAction<OwnerType>>;
}

const SettingsUpdateForm = ({
  ownerInfo,
  setOwnerInfoState,
}: SettingUpdateFormProps) => {
  const [form] = Form.useForm();
  const [activeUpdate, setActiveUpdate] = useState(true);
  const [categoryList, setCategoryList] = useState<string[]>(
    ownerInfo.productCategory
  );
  const [memberShipList, setMemberShipList] = useState<string[]>(
    ownerInfo.memberShipList || []
  );
  const [membershipMonths, setMembershipMonths] = useState<number[]>([]);

  const onFinish = async (values: OwnerType) => {
    try {
      const newValues = {
        ...values,
        memberShipPrice: parseFloat(values.memberShipPrice as string),
      };
      const response = await axiosClient.put("/auth/update-owner", newValues);
      if (response.status === 200) {
        message.success({
          key: "updateSuccess",
          content: "Settings updated successfully",
        });
        setOwnerInfoState({ ...values });
      }
    } catch (error) {
      message.error({
        key: "updateError",
        content: "Error while updating the settings",
      });
    } finally {
      setActiveUpdate(true);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          if (activeUpdate) {
            message.success({
              key: "activeUpdate",
              content: "Active Update Mode ⚒",
            });
          } else {
            message.error({
              key: "activeUpdate",
              content: "Inactive Update Mode ⚒",
            });
          }

          setActiveUpdate(!activeUpdate);
        }}
        ghost
      >
        Active Update Mode
      </Button>
      <Divider />
      <Form
        layout="vertical"
        className="w-1/2 items-center justify-center"
        initialValues={{
          ...ownerInfo,
          productCategory: categoryList,
          memberShipList: memberShipList,
        }}
        form={form}
        onFinish={onFinish}
        disabled={activeUpdate}
      >
        <motion.div
          className="flex flex-col gap-2 "
          variants={formDisableAnimation}
          animate={activeUpdate ? "hidden" : "visible"}
        >
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
        </motion.div>
      </Form>
    </>
  );
};

export default SettingsUpdateForm;

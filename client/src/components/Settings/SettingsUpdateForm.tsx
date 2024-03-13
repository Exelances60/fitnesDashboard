"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { Divider } from "@tremor/react";
import { motion } from "framer-motion";
import { formDisableAnimation } from "@/utils/utils";
import SelectCategoryDropDown from "../SelectCategoryDropDown";
import SelectMemberShipDropDown from "../SelectMemberShipDropDown";

interface SettingUpdateFormProps {
  ownerInfo: OwnerType;
}

const SettingsUpdateForm = ({ ownerInfo }: SettingUpdateFormProps) => {
  const [form] = Form.useForm();
  const [activeUpdate, setActiveUpdate] = useState(true);
  const [categoryList, setCategoryList] = useState<string[]>(
    ownerInfo.productCategory
  );
  const [memberShipList, setMemberShipList] = useState<string[]>(
    ownerInfo.memberShipList || []
  );

  console.log("ownerInfo", ownerInfo);

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
        initialValues={ownerInfo}
        form={form}
        disabled={activeUpdate}
      >
        <motion.div
          className="flex flex-col gap-2 "
          variants={formDisableAnimation}
          animate={activeUpdate ? "hidden" : "visible"}
        >
          <Form.Item name="companyName" label="Company Name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input type="tel" />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Product Category" name="productCategory">
            <Select
              placeholder="Select a category"
              allowClear
              mode="multiple"
              style={{ width: "100%" }}
              dropdownRender={(menu) => (
                <SelectCategoryDropDown
                  menu={menu}
                  setCategoryList={setCategoryList}
                  categoryList={categoryList}
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
          <Form.Item label="Memembership Type" name="memberShipList">
            <Select
              placeholder="Enter the membership"
              allowClear
              style={{ width: "100%" }}
              mode="multiple"
              dropdownRender={(menu) => (
                <SelectMemberShipDropDown
                  menu={menu}
                  setMemberShipList={setMemberShipList}
                  memberShipList={memberShipList}
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
        </motion.div>
      </Form>
    </>
  );
};

export default SettingsUpdateForm;

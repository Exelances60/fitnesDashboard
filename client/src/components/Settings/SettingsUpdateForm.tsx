"use client";
import React, { useState } from "react";
import { Button, Form, message } from "antd";
import { Divider } from "@tremor/react";
import { motion } from "framer-motion";
import { formDisableAnimation } from "@/utils/utils";
import axiosClient from "@/utils/AxiosClient";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import SettingUpdateFormItems from "./SettingUpdateFormItems";

interface SettingUpdateFormProps {
  ownerInfo: OwnerType;
}

const SettingsUpdateForm = ({ ownerInfo }: SettingUpdateFormProps) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [activeUpdate, setActiveUpdate] = useState(true);
  const [categoryList, setCategoryList] = useState<string[]>(
    ownerInfo.productCategory
  );
  const [memberShipList, setMemberShipList] = useState<string[]>(
    ownerInfo.memberShipList || []
  );

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
        dispatch(setUser(response.data.owner));
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
          <SettingUpdateFormItems
            categoryList={categoryList}
            memberShipList={memberShipList}
            setCategoryList={setCategoryList}
            setMemberShipList={setMemberShipList}
          />
        </motion.div>
      </Form>
    </>
  );
};

export default SettingsUpdateForm;

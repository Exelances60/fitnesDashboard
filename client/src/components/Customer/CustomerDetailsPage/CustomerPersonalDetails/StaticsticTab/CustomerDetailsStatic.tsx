"use client";
import {
  Badge,
  Button,
  Calendar,
  CalendarProps,
  ColorPicker,
  ColorPickerProps,
  Drawer,
  Form,
  GetProp,
  Input,
  Select,
} from "antd";
import type { Dayjs } from "dayjs";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axiosClient from "@/utils/AxiosClient";
import useMessage from "@/hooks/useMessage";
import { CustomerType } from "@/types/Customer";

type Color = GetProp<ColorPickerProps, "value">;

const CustomerDetailsStatic = ({ customer }: { customer: CustomerType }) => {
  const showMessage = useMessage();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const getListData = (value: Dayjs) => {
    let listData;
    if (customer.calendarAcv) {
      listData = customer.calendarAcv.filter((item) => {
        return value.isSame(item?.date, "day");
      });
    }
    return listData || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);

    return (
      <div className="z-10 cursor-pointer">
        {listData.map((item) => {
          return (
            <Badge
              key={item._id}
              color={item?.color}
              text={item.text}
              size="small"
            />
          );
        })}
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const openDrawerHandler = (date: Dayjs) => {
    setSelectedDate(date);
    setOpenDrawer(true);
  };

  const handeleAddPlan = async (value: {
    planType: string;
    planText: string;
    color: Color;
  }) => {
    showMessage("Adding Plan", "info", 1);
    const hexString =
      typeof value.color === "string"
        ? value.color
        : value.color?.toHexString();
    const bodyValue = {
      planType: value.planType,
      planText: value.planText,
      color: hexString,
      date: selectedDate,
      customerId: customer._id,
    };
    try {
      const response = await axiosClient.post(
        "/customers/add-customer-activity",
        bodyValue
      );
      if (response.status === 201) {
        showMessage("Plan Added Successfully", "success", 1);
        setOpenDrawer(false);
      }
    } catch (error) {
      showMessage("Something went wrong", "error", 1);
    }
  };

  return (
    <div>
      <Calendar onSelect={openDrawerHandler} cellRender={cellRender} />
      <Drawer
        title="Add Event Or Plan"
        placement="right"
        closable={false}
        onClose={() => {
          setSelectedPlan("");
          setOpenDrawer(false);
        }}
        size="large"
        extra={
          <Button type="primary" form="addActivity" htmlType="submit">
            Add Plan
          </Button>
        }
        open={openDrawer}
      >
        <div className="flex flex-col gap-4 ">
          <h1 className="text-lg font-bold mb-2">
            {selectedDate?.format("DD-MM-YYYY")} Add Plan
          </h1>
          <Form layout="vertical" onFinish={handeleAddPlan} id="addActivity">
            <Form.Item
              label="Select Plan"
              name="planType"
              rules={[{ required: true, message: "Please select plan" }]}
            >
              <Select
                className="w-full"
                placeholder="Select Plan"
                onChange={(value) => {
                  setSelectedPlan(value);
                }}
              >
                <Select.Option value="bodyInfo">Body Info</Select.Option>
                <Select.Option value="exercises">Exercises Info</Select.Option>
                <Select.Option value="nutrition">Nutrition Info</Select.Option>
                <Select.Option value="progress">Progress Info</Select.Option>
              </Select>
            </Form.Item>

            {selectedPlan ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div>
                  <Form.Item
                    label="Add Plan"
                    name="planText"
                    rules={[{ required: true, message: "Please add plan" }]}
                  >
                    <Input.TextArea
                      className="mt-2 "
                      placeholder="Add Plan"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Select Color"
                  name="color"
                  initialValue={"#6b41ec"}
                  rules={[{ required: true, message: "Please select color" }]}
                >
                  <ColorPicker className="mt-2" format="hex" />
                </Form.Item>
              </motion.div>
            ) : null}
          </Form>
        </div>
      </Drawer>
    </div>
  );
};

export default CustomerDetailsStatic;

"use client";
import {
  Badge,
  Button,
  Calendar,
  CalendarProps,
  ColorPickerProps,
  Drawer,
  GetProp,
} from "antd";
import type { Dayjs } from "dayjs";
import React, { useState } from "react";
import axiosClient from "@/utils/AxiosClient";
import useMessage from "@/hooks/useMessage";
import { CustomerType } from "@/types/Customer";
import CustomerDetailsStaticForm from "./CustomerDetailsStaticForm";
import { DeleteOutlined } from "@ant-design/icons";
import { SelectInfo } from "antd/es/calendar/generateCalendar";

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

  const openDrawerHandler = (date: Dayjs, info: SelectInfo) => {
    if (info.source === "date") {
      setSelectedDate(date);
      setOpenDrawer(true);
    }
  };

  const handleAddPlan = async (value: {
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
          <CustomerDetailsStaticForm
            handleAddPlan={handleAddPlan}
            setSelectedPlan={setSelectedPlan}
            selectedPlan={selectedPlan}
          />
          <h1 className="text-lg font-bold mb-2 font-mono">
            {selectedDate?.format("DD-MM-YYYY")} Plans
          </h1>
          {customer.calendarAcv?.map((item) => {
            if (selectedDate?.isSame(item?.date, "day")) {
              return (
                <div key={item._id} className="flex gap-2">
                  <Badge color={item.color} text={item.text} />
                  <DeleteOutlined
                    className="cursor-pointer text-red-500 hover:scale-110 ease-in duration-300"
                    color="red"
                  />
                </div>
              );
            }
          })}
        </div>
      </Drawer>
    </div>
  );
};

export default CustomerDetailsStatic;

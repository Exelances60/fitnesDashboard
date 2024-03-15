import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Badge, Popconfirm, message } from "antd";
import type { Dayjs } from "dayjs";
import axiosClient from "@/utils/AxiosClient";

interface CustomerCalendarActListProps {
  customerCalendarState: CustomerActivityType[];
  setCustomerCalendarState: React.Dispatch<
    React.SetStateAction<CustomerActivityType[]>
  >;
  selectedDate: Dayjs | null;
}

const CustomerCalendarActList = ({
  customerCalendarState,
  setCustomerCalendarState,
  selectedDate,
}: CustomerCalendarActListProps) => {
  const deleteHandler = async (id: string) => {
    message.loading({ content: "Deleting...", key: "delete" });
    try {
      const response = await axiosClient.delete(
        `/calendarAct/delete-act/${id}`
      );
      if (response.status === 200) {
        message.success({ content: "Deleted Plan", key: "delete" });
        setCustomerCalendarState((prev) =>
          prev.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      message.error({ content: `${error}`, key: "delete" });
    }
  };

  return (
    <>
      {customerCalendarState?.map((item: CustomerActivityType) => {
        if (selectedDate?.isSame(item?.date, "day")) {
          return (
            <div key={item._id} className="flex gap-2">
              <Badge color={item.color} text={item.text} />
              <Popconfirm
                title="Are you sure to delete this plan?"
                okText="Yes"
                onConfirm={() => deleteHandler(item._id)}
                cancelText="No"
              >
                <DeleteOutlined
                  className="cursor-pointer text-red-500 hover:scale-110 ease-in duration-300"
                  color="red"
                />
              </Popconfirm>
            </div>
          );
        }
      })}
    </>
  );
};

export default CustomerCalendarActList;

"use client";
import { Card } from "@tremor/react";
import { Table, DatePicker } from "antd";
import React, { useState } from "react";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import axiosClient from "@/utils/AxiosClient";
import useMessage from "@/hooks/useMessage";
import OrderTableDetailsCol from "./OrderTableDetailsCol";
import { statusFilter, statusRender } from "@/mock/orderStatusFilter";
import useTableFilterSearchDropDown from "@/hooks/useTableFilterSearchDropDown";
import useTableSearchOrderOwner from "@/hooks/useOrderTableOrderOwner";

const { RangePicker } = DatePicker;

type OrderContainerProps = {
  orders: OrdersType[] | [];
};
const OrderContainer = ({ orders }: OrderContainerProps) => {
  const { filterDropdown, filterIcon, searchById } =
    useTableFilterSearchDropDown("Search by order id");
  const { filterDropdownOrderOwner, searchByOrderOwner } =
    useTableSearchOrderOwner("Search by order owner");
  const [rangePickerValue, setRangePickerValue] = useState([null, null]);
  const userInfo = useSelectUserInfo();
  const showMessage = useMessage();

  const categoryFilter = userInfo?.productCategory
    ? [
        { text: "ProteinPowder", value: "ProteinPowder" },
        { text: "Vitamins", value: "Vitamins" },
        { text: "Supplements", value: "Supplements" },
        { text: "Others", value: "Others" },
        ...userInfo.productCategory.map((category) => ({
          text: category,
          value: category,
        })),
      ]
    : [];

  const filteredOrders = orders.filter((order) => {
    const [start, end] = rangePickerValue;
    return (
      !(start && end) ||
      (new Date(order.createdAt).getTime() >= new Date(start).getTime() &&
        new Date(order.createdAt).getTime() <= new Date(end).getTime())
    );
  });

  const filteredOrdersById = filteredOrders.filter((order) => {
    return order._id.toLowerCase().includes(searchById.toLowerCase());
  });

  const filteredOrdersByOrderOwner = filteredOrdersById.filter((order) => {
    return order.orderOwner
      .toLowerCase()
      .includes(searchByOrderOwner.toLowerCase());
  });

  const handleCompleteOrder = async (orderId: string) => {
    showMessage("Loading", "loading", 0.2);
    try {
      const response = await axiosClient.post("/orders/ordercompleted", {
        orderId,
      });
      if (response.status === 200) showMessage("Order Completed", "success", 1);
    } catch (error: any) {
      showMessage(error.response.data.errorMessage, "error", 2);
    }
  };
  return (
    <Card className="flex flex-col gap-5 overflow-auto" title="Orders">
      <div className="w-full flex flex-col items-end gap-2 justify-end">
        <RangePicker
          className="w-[50%] md:w-[30%]"
          format={"YYYY-MM-DD"}
          placement="bottomRight"
          onChange={(dates, dateStrings: any) => {
            setRangePickerValue(dateStrings);
          }}
        />
      </div>
      <Table
        dataSource={filteredOrdersByOrderOwner}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        className="overflow-x-auto"
      >
        <Table.Column
          title="Order Id"
          dataIndex="_id"
          key="_id"
          render={(text) => <p className="text-blue-500">{text}</p>}
          filterDropdown={filterDropdown}
          filterIcon={filterIcon}
        />

        <Table.Column
          title="Order Owner"
          dataIndex="orderOwner"
          key="orderOwner"
          filterDropdown={filterDropdownOrderOwner}
          filterIcon={filterIcon}
          render={(text) => <p className="text-blue-500 underline">{text}</p>}
          onFilter={(value, record: any) =>
            record.orderOwner.indexOf(value) === 0
          }
        />
        <Table.Column title="Address" dataIndex="adress" key="adress" />
        <Table.Column
          title="Total Price"
          dataIndex="totalPrice"
          key="totalPrice"
          sorter={(a: OrdersType, b: OrdersType) => a.totalPrice - b.totalPrice}
          render={(text) => <p className="text-green-500">{text} TL</p>}
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={statusRender}
          filters={statusFilter}
          onFilter={(value, record: any) => record.status.indexOf(value) === 0}
        />
        <Table.Column
          title="Phone"
          dataIndex="phone"
          key="phone"
          render={(text) => <p className="text-blue-500 underline">+{text}</p>}
        />
        <Table.Column
          title="Category"
          dataIndex="orderCategory"
          key="category"
          render={(text, record: any) => {
            if (record.products.length) {
              return record.products.map((product: any) => (
                <p key={product._id}>{product.category}</p>
              ));
            }
            return <p>{text}</p>;
          }}
          filters={categoryFilter}
          onFilter={(value, record: any) => {
            return record.products.some(
              (product: any) => product.category.indexOf(value) === 0
            );
          }}
        />
        <Table.Column
          title="Created At"
          dataIndex="createdAt"
          key="createdAt"
          render={(text) => new Date(text).toLocaleString()}
          sorter={(a: OrdersType, b: OrdersType) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          }
        />
        <Table.Column
          title="Updated At"
          dataIndex="updatedAt"
          key="updatedAt"
          render={(text) => new Date(text).toLocaleString()}
        />
        <Table.Column
          title="Details"
          key="details"
          render={(record: OrdersType) => (
            <OrderTableDetailsCol
              record={record}
              handleCompleteOrder={handleCompleteOrder}
            />
          )}
        />
      </Table>
    </Card>
  );
};

export default OrderContainer;

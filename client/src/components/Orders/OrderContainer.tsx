"use client";
import { ordersType } from "@/models/dataTypes";
import { Card } from "@tremor/react";
import { Table } from "antd";
import React from "react";

type OrderContainerProps = {
  orders: ordersType[];
};
const OrderContainer = ({ orders }: OrderContainerProps) => {
  console.log(orders);
  return (
    <Card className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Orders</h1>
      {/*      <Table
        dataSource={orders}
        className="overflow-x-auto w-full"
        columns={[
          {
            title: "Order ID",
            dataIndex: "_id",
            key: "id",
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
          },
          {
            title: "Total",
            dataIndex: "total",
            key: "total",
          },
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
          },
        ]}
      /> */}
    </Card>
  );
};

export default OrderContainer;

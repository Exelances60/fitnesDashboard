"use client";
import { currencyFormatter } from "@/utils/utils";
import { Card } from "@tremor/react";
import { Collapse } from "antd";
import React from "react";

interface IInvoiceContainerProps {
  data: OrdersType[];
}

const InvoiceContainer = ({ data }: IInvoiceContainerProps) => {
  console.log(data);
  return (
    <Card className="flex flex-col gap-2 min-h-[810px]">
      {data.map((order) => (
        <Collapse key={order._id}>
          <Collapse.Panel header={`Order #${order._id}`} key={order._id}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-bold">Order ID</span>
                <span className="text-blue-500">{order._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Order Date</span>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Order Status</span>
                <span className="text-green-500">{order.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Order Total</span>
                <span>{currencyFormatter(order.totalPrice, "TRY")}</span>
              </div>
            </div>
          </Collapse.Panel>
        </Collapse>
      ))}
    </Card>
  );
};

export default InvoiceContainer;

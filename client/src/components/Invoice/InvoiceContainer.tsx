"use client";
import React from "react";
import { Card } from "@tremor/react";
import { Collapse, CollapseProps, Empty } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/store";
import { setSelectedInvoiceData } from "@/store/slices/invoiceSlice";
import { useRouter } from "next/navigation";
import InvoiceShowProducts from "./InvoiceShowProducts";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

interface IInvoiceContainerProps {
  data: OrdersType[];
}

const InvoiceContainer = ({ data }: IInvoiceContainerProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { renderCurrency } = useCurrencyFormatter();

  const editPDFDocument = async (order: OrdersType) => {
    dispatch(setSelectedInvoiceData(order));
    router.push("/dashboard/invoice/createinvoicepdf");
  };

  const items: CollapseProps["items"] = data.map((order) => ({
    key: order._id,
    label: (
      <div className="flex justify-between flex-wrap">
        <div className="flex gap-2">
          <span className="font-bold">Order ID</span>
          <span className="text-blue-500">{order._id}</span>
        </div>
        <div className="flex gap-4">
          <FilePdfOutlined
            color="error"
            onClick={() => editPDFDocument(order)}
          />
        </div>
      </div>
    ),
    children: (
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
          <span>{renderCurrency(order.totalPrice)}</span>
        </div>
        <InvoiceShowProducts order={order} />
      </div>
    ),
  }));

  return (
    <Card className="flex flex-col gap-2 min-h-[810px]">
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl">No Invoice Found</h1>
          <Empty />
        </div>
      ) : (
        <Collapse items={items} />
      )}
    </Card>
  );
};

export default InvoiceContainer;

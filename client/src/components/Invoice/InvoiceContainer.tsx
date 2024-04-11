"use client";
import React from "react";
import { currencyFormatter } from "@/utils/utils";
import { Card } from "@tremor/react";
import { Collapse, CollapseProps } from "antd";
import InvoiceShowProducts from "./InvoiceShowProducts";
import { PrinterOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/store";
import { setSelectedInvoiceData } from "@/store/slices/invoiceSlice";
import { useRouter } from "next/navigation";

interface IInvoiceContainerProps {
  data: OrdersType[];
}

const InvoiceContainer = ({ data }: IInvoiceContainerProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const editPDFDocument = async (order: OrdersType) => {
    await dispatch(setSelectedInvoiceData(order));
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
          <PrinterOutlined />
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
          <span>{currencyFormatter(order.totalPrice, "TRY")}</span>
        </div>
        <InvoiceShowProducts order={order} />
      </div>
    ),
  }));

  return (
    <Card className="flex flex-col gap-2 min-h-[810px]">
      <Collapse items={items} />
    </Card>
  );
};

export default InvoiceContainer;

"use client";
import { Card } from "@tremor/react";
import { Table, DatePicker } from "antd";
import React, { useState } from "react";
import axiosClient from "@/utils/AxiosClient";
import useMessage from "@/hooks/useMessage";
import OrderTableDetailsCol from "./OrderTableDetailsCol";
import { statusFilter, statusRender } from "@/mock/orderStatusFilter";
import useTableFilterSearchDropDown from "@/hooks/useTableFilterSearchDropDown";
import useTableSearchOrderOwner from "@/hooks/useOrderTableOrderOwner";
import { useAppSelector } from "@/store/store";
import { selectProductCategory } from "@/store/slices/userSlice";
import { useTranslations } from "next-intl";

const { RangePicker } = DatePicker;

type OrderContainerProps = {
  orders: OrdersType[] | [];
};
const OrderContainer = ({ orders }: OrderContainerProps) => {
  const t = useTranslations("Order.OrderContainer");
  const { filterDropdown, filterIcon, searchById } =
    useTableFilterSearchDropDown(t("searchByOrderId"));
  const { filterDropdownOrderOwner, searchByOrderOwner } =
    useTableSearchOrderOwner(t("searchByOrderOwner"));
  const [rangePickerValue, setRangePickerValue] = useState([null, null]);
  const productCategory = useAppSelector(selectProductCategory);
  const showMessage = useMessage();

  const categoryFilter = productCategory
    ? [
        { text: t("proteinPowder"), value: "ProteinPowder" },
        { text: t("vitamins"), value: "Vitamins" },
        { text: t("supplements"), value: "Supplements" },
        { text: t("others"), value: "Others" },
        ...productCategory.map((category) => ({
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
    showMessage(t("loading"), "loading", 0.2);
    try {
      const response = await axiosClient.post("/orders/ordercompleted", {
        orderId,
      });
      if (response.status === 200)
        showMessage(t("orderCompleted"), "success", 1);
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
          title={t("orderId")}
          dataIndex="_id"
          key="_id"
          render={(text) => <p className="text-blue-500">{text}</p>}
          filterDropdown={filterDropdown}
          filterIcon={filterIcon}
        />

        <Table.Column
          title={t("orderOwner")}
          dataIndex="orderOwner"
          key="orderOwner"
          filterDropdown={filterDropdownOrderOwner}
          filterIcon={filterIcon}
          render={(text) => <p className="text-blue-500 underline">{text}</p>}
          onFilter={(value, record: any) =>
            record.orderOwner.indexOf(value) === 0
          }
        />
        <Table.Column title={t("address")} dataIndex="adress" key="adress" />
        <Table.Column
          title={t("totalPrice")}
          dataIndex="totalPrice"
          key="totalPrice"
          sorter={(a: OrdersType, b: OrdersType) => a.totalPrice - b.totalPrice}
          render={(text) => <p className="text-green-500">{text} TL</p>}
        />
        <Table.Column
          title={t("status")}
          dataIndex="status"
          key="status"
          render={statusRender}
          filters={statusFilter}
          onFilter={(value, record: any) => record.status.indexOf(value) === 0}
        />
        <Table.Column
          title={t("phone")}
          dataIndex="phone"
          key="phone"
          render={(text) => <p className="text-blue-500 underline">+{text}</p>}
        />
        <Table.Column
          title={t("category")}
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
          title={t("createdAt")}
          dataIndex="createdAt"
          key="createdAt"
          render={(text) => new Date(text).toLocaleString()}
          sorter={(a: OrdersType, b: OrdersType) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          }
        />
        <Table.Column
          title={t("updatedAt")}
          dataIndex="updatedAt"
          key="updatedAt"
          render={(text) => new Date(text).toLocaleString()}
        />
        <Table.Column
          title={t("details")}
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

"use client";
import { ordersType } from "@/models/dataTypes";
import { Card, Badge } from "@tremor/react";
import { Table, Button } from "antd";
import React, { useState } from "react";
import OrderDetailModal from "./OrderDetailModal";
import OrderUpdateDrawer from "./OrderUpdateDrawer";

type OrderContainerProps = {
  orders: ordersType[];
};
const OrderContainer = ({ orders }: OrderContainerProps) => {
  const [orderDetailModalVisible, setOrderDetailModalVisible] = useState(false);
  const [updateOrderDrawerVisible, setUpdateOrderDrawerVisible] =
    useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ordersType | null>(null);

  return (
    <Card className="flex flex-col gap-2">
      {orderDetailModalVisible ? (
        <OrderDetailModal
          orderDetailModalVisible={orderDetailModalVisible}
          setOrderDetailModalVisible={setOrderDetailModalVisible}
          selectedOrder={selectedOrder}
        />
      ) : null}
      {updateOrderDrawerVisible ? (
        <OrderUpdateDrawer
          updateOrderDrawerVisible={updateOrderDrawerVisible}
          setUpdateOrderDrawerVisible={setUpdateOrderDrawerVisible}
          selectedOrder={selectedOrder}
        />
      ) : null}

      <h1 className="text-2xl font-bold">Orders</h1>
      <Table
        dataSource={orders}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        className="overflow-x-auto"
      >
        <Table.Column
          title="Order Id"
          dataIndex="_id"
          key="_id"
          render={(text) => <p className="text-blue-500">{text}</p>}
        />
        <Table.Column
          title="Order Owner"
          dataIndex="orderOwner"
          key="orderOwner"
          render={(text) => <p className="text-blue-500 underline">{text}</p>}
        />
        <Table.Column title="Address" dataIndex="adress" key="adress" />
        <Table.Column
          title="Total Price"
          dataIndex="totalPrice"
          key="totalPrice"
          render={(text) => <p className="text-green-500">{text} TL</p>}
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(text) => {
            if (text === "pending") {
              return <Badge color="violet">{text}</Badge>;
            }
            if (text === "Completed") {
              return <Badge color="emerald">{text}</Badge>;
            }
            if (text === "canceled") {
              return <Badge color="red">{text}</Badge>;
            }
          }}
        />
        <Table.Column
          title="Phone"
          dataIndex="phone"
          key="phone"
          render={(text) => <p className="text-blue-500 underline">+{text}</p>}
        />
        <Table.Column
          title="Created At"
          dataIndex="createdAt"
          key="createdAt"
          render={(text) => new Date(text).toLocaleString()}
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
          render={(text, record: ordersType) => {
            return (
              <div className="flex gap-2">
                <Button
                  type="primary"
                  onClick={() => {
                    if (record !== selectedOrder) {
                      setSelectedOrder(record);
                    }
                    setOrderDetailModalVisible(true);
                  }}
                >
                  Details
                </Button>
                <Button
                  type="primary"
                  ghost
                  onClick={() => {
                    if (record !== selectedOrder) {
                      setSelectedOrder(record);
                    }
                    setUpdateOrderDrawerVisible(true);
                  }}
                >
                  Update
                </Button>
              </div>
            );
          }}
        />
      </Table>
    </Card>
  );
};

export default OrderContainer;

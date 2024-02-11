"use client";
import { ordersType } from "@/models/dataTypes";
import { Card, Badge } from "@tremor/react";
import { Table, Button, DatePicker, Input } from "antd";
import React, { useState } from "react";
import OrderDetailModal from "./OrderDetailModal";
import OrderUpdateDrawer from "./OrderUpdateDrawer";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import { useAppDispatch } from "@/store/store";
import { showModal } from "@/store/slices/modalSlice";
import { setHideDrawer, setShowDrawer } from "@/store/slices/drawerSlice";

const { RangePicker } = DatePicker;

type OrderContainerProps = {
  orders: ordersType[];
};
const OrderContainer = ({ orders }: OrderContainerProps) => {
  const [updateOrderDrawerVisible, setUpdateOrderDrawerVisible] =
    useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ordersType | null>(null);
  const [rangePickerValue, setRangePickerValue] = useState([null, null]);
  const dispatch = useAppDispatch();
  const userInfo = useSelectUserInfo();

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
    if (rangePickerValue[0] && rangePickerValue[1]) {
      return (
        new Date(order.createdAt).getTime() >=
          new Date(rangePickerValue[0]).getTime() &&
        new Date(order.createdAt).getTime() <=
          new Date(rangePickerValue[1]).getTime()
      );
    }
    return order;
  });

  const openDetailModal = (selectedOrderFuc: ordersType) => {
    if (selectedOrderFuc) {
      dispatch(
        showModal({
          children: <OrderDetailModal selectedOrder={selectedOrderFuc} />,
          title: "Order Details",
        })
      );
    }
  };

  const openUpdateDrawer = (selectedOrderFuc: ordersType) => {
    if (selectedOrderFuc) {
      dispatch(
        setShowDrawer({
          children: <OrderUpdateDrawer selectedOrder={selectedOrderFuc} />,
          title: "Update Order",
          footer: (
            <div className="flex justify-end gap-4">
              <Button
                type="primary"
                htmlType="submit"
                className="p-5 box-border"
                size="middle"
                form="updateOrderForm"
              >
                Update Order
              </Button>
              <Button
                type="default"
                className="p-5 box-border"
                size="middle"
                onClick={() => dispatch(setHideDrawer())}
              >
                Cancel
              </Button>
            </div>
          ),
        })
      );
    }
  };

  return (
    <Card className="flex flex-col gap-5" title="Orders">
      {/*      {updateOrderDrawerVisible ? (
        <OrderUpdateDrawer
          updateOrderDrawerVisible={updateOrderDrawerVisible}
          setUpdateOrderDrawerVisible={setUpdateOrderDrawerVisible}
          selectedOrder={selectedOrder}
        />
      ) : null} */}

      <div className="w-full flex flex-col items-end gap-2 justify-end">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div>
          <Input placeholder="Search" />
          <RangePicker
            className="w-[25%]"
            format={"YYYY-MM-DD"}
            onChange={(dates, dateStrings: any) => {
              setRangePickerValue(dateStrings);
            }}
          />
        </div>
      </div>

      <Table
        dataSource={filteredOrders}
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
          sorter={(a: ordersType, b: ordersType) => a.totalPrice - b.totalPrice}
          render={(text) => <p className="text-green-500">{text} TL</p>}
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(text) => {
            if (text === "Pending" || text === "pending") {
              return <Badge color="violet">{text}</Badge>;
            }
            if (text === "Completed" || text === "completed") {
              return <Badge color="emerald">{text}</Badge>;
            }
            if (text === "Cancelled" || text === "cancelled") {
              return <Badge color="red">{text}</Badge>;
            }
            if (text === "Preparing" || text === "preparing") {
              return <Badge color="blue">{text}</Badge>;
            }
          }}
          filters={[
            {
              text: "Pending",
              value: "Pending" || "pending",
            },
            {
              text: "Completed",
              value: "Completed" || "completed",
            },
            {
              text: "Cancelled",
              value: "Cancelled" || "cancelled",
            },
            {
              text: "Preparing",
              value: "Preparing" || "preparing",
            },
          ]}
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
          dataIndex="category"
          key="category"
          render={(text, record: any) => {
            return record.products.map((product: any, index: number) => (
              <p key={index}>{product.category}</p>
            ));
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
          sorter={(a: ordersType, b: ordersType) =>
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
          render={(text, record: ordersType) => {
            return (
              <div className="flex gap-2">
                <Button
                  type="primary"
                  onClick={() => {
                    openDetailModal(record);
                  }}
                >
                  Details
                </Button>
                <Button
                  type="primary"
                  ghost
                  onClick={() => {
                    openUpdateDrawer(record);
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

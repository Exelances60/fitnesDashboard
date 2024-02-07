import React from "react";
import { Drawer, Form, Input, Select } from "antd";
import { ordersType } from "@/models/dataTypes";

type OrderUpdateDrawerProps = {
  updateOrderDrawerVisible: boolean;
  setUpdateOrderDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOrder: ordersType | null;
};

const OrderUpdateDrawer = ({
  updateOrderDrawerVisible,
  setUpdateOrderDrawerVisible,
  selectedOrder,
}: OrderUpdateDrawerProps) => {
  console.log(selectedOrder);
  return (
    <Drawer
      open={updateOrderDrawerVisible}
      onClose={() => setUpdateOrderDrawerVisible(false)}
      size="large"
    >
      <Form layout="vertical" initialValues={selectedOrder || []}>
        <Form.Item label="Order Owner" name="orderOwner">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="adress">
          <Input />
        </Form.Item>
        <Form.Item label="Order Owner Email" name="orderOwnerEmail">
          <Input />
        </Form.Item>
        <Form.Item label="Total Price" name="totalPrice">
          <Input />
        </Form.Item>
        <Form.Item label="Order Status" name="status">
          <Select
            defaultValue={selectedOrder?.status}
            style={{ width: 250 }}
            placement="bottomRight"
            options={[
              { label: "Pending", value: "Pending" },
              { label: "Completed", value: "Completed" },
              { label: "Cancelled", value: "Cancelled" },
              { label: "Preparing", value: "Preparing" },
            ]}
            optionRender={(item) => {}}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default OrderUpdateDrawer;

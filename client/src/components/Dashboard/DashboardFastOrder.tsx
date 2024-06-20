import React from "react";
import OrderContainer from "../Orders/OrderContainer";
import useOrders from "@/hooks/useOrder";
import { Spin } from "antd";

const DashboardFastOrder = () => {
  const orders = useOrders();
  return (
    <Spin spinning={orders.length === 0}>
      <OrderContainer orders={orders} />
    </Spin>
  );
};

export default DashboardFastOrder;

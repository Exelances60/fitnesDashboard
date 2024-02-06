import fetchOrder from "@/actions/fetchOrder";
import OrderContainer from "@/components/Orders/OrderContainer";
import React from "react";

const Order = async () => {
  const orders = await fetchOrder();
  return (
    <div>
      <OrderContainer orders={orders} />
    </div>
  );
};

export default Order;

import fetchOrder from "@/actions/fetchOrder";
import OrderChats from "@/components/Orders/OrderChats";
import OrderContainer from "@/components/Orders/OrderContainer";
import React from "react";

const Order = async () => {
  const { orders, chartsData } = await fetchOrder();

  return (
    <div className="flex flex-col gap-2">
      <OrderContainer orders={orders} />
      <OrderChats chartsDonutData={chartsData} />
    </div>
  );
};

export default Order;

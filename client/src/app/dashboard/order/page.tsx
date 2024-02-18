import fetchOrder from "@/actions/fetchOrder";
import OrderChats from "@/components/Orders/OrderCharts/OrderChats";
import OrderContainer from "@/components/Orders/OrderContainer";
import OrdersCards from "@/components/Orders/OrdersCards";
import React from "react";

const Order = async () => {
  const { orders, chartsData, cardData } = await fetchOrder();

  return (
    <div className="flex flex-col gap-2">
      <OrdersCards cardData={cardData} />
      <OrderContainer orders={orders} />
      <OrderChats chartsDonutData={chartsData} />
    </div>
  );
};

export default Order;

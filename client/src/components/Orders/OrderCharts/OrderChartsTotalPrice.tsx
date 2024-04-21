"use client";
import React, { useState } from "react";
import { Card, DonutChart, List, ListItem } from "@tremor/react";
import OrderChartsSelectedDetails from "./OrderChartsSelectedDetails";
import OrderChartsList from "./OrderChartsList";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

type OrderChartsTotalPriceProps = {
  chartsDonutData: orderDonutChartType[];
};

const OrderChartsTotalPrice = ({
  chartsDonutData,
}: OrderChartsTotalPriceProps) => {
  const [selected, setSelected] = useState<orderDonutChartType | null>(null);
  chartsDonutData.sort((a, b) => b.totalPrice - a.totalPrice);
  const topTenItems = chartsDonutData.slice(0, 10);
  const { renderCurrency } = useCurrencyFormatter();
  return (
    <Card title="Order Chats" className="order-chats">
      <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Total price by order
      </h3>
      <div className="flex">
        <DonutChart
          className="mt-8"
          data={chartsDonutData}
          category="totalPrice"
          index="name"
          valueFormatter={renderCurrency}
          onValueChange={(value) => setSelected(value)}
          colors={["cyan", "blue", "indigo", "violet", "fuchsia"]}
        />
      </div>

      <OrderChartsSelectedDetails selected={selected} />

      <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
        <span>Product Name</span>
        <span>Price / Share</span>
      </p>
      <List className="mt-2">
        {topTenItems.map((item, index) => (
          <ListItem key={index} className="space-x-6">
            <OrderChartsList item={item} />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default OrderChartsTotalPrice;

"use client";
import React, { useState } from "react";
import { Card, DonutChart, List, ListItem } from "@tremor/react";
import OrderChartsSelectedDetails from "./OrderChartsSelectedDetails";
import OrderChartsList from "./OrderChartsList";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import Image from "next/image";

type OrderChartsTotalPriceProps = {
  chartsDonutData: orderDonutChartType[];
};

type CustomTooltipTypeDonut = {
  payload: any;
  active: boolean | undefined;
  label: any;
};

const OrderChartsTotalPrice = ({
  chartsDonutData,
}: OrderChartsTotalPriceProps) => {
  const [selected, setSelected] = useState<orderDonutChartType | null>(null);
  chartsDonutData.sort((a, b) => b.totalPrice - a.totalPrice);
  const topTenItems = chartsDonutData.slice(0, 10);
  const { renderCurrency } = useCurrencyFormatter();

  const customTooltip = (props: CustomTooltipTypeDonut) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    const categoryPayload = payload?.[0];
    if (!categoryPayload) return null;
    return (
      <div className="rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        <div className="flex items-center w-full justify-between">
          <Image
            src={categoryPayload.payload.orderImages}
            width={50}
            height={50}
            alt={categoryPayload.name}
          />
        </div>
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`flex w-1.5 flex-col bg-${categoryPayload?.color}-500 rounded`}
          />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8">
              <p className="whitespace-nowrap text-right text-tremor-content">
                {categoryPayload.name}
              </p>
              <p className="whitespace-nowrap text-right font-medium text-tremor-content-emphasis">
                {categoryPayload.value}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          customTooltip={customTooltip}
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

"use client";
import React from "react";
import { Card, DonutChart, List, ListItem } from "@tremor/react";
import { currencyFormatter } from "@/utils/utils";

type OrderChartsCategoryProps = {
  chartsDonutData: orderDonutChartType[];
};

const OrderChartsCategory = ({ chartsDonutData }: OrderChartsCategoryProps) => {
  const filteredByCategory = chartsDonutData.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = 0;
    }
    acc[curr.category] += curr.totalPrice;
    return acc;
  }, {} as Record<string, number>);
  const data = Object.keys(filteredByCategory).map((category) => ({
    category,
    totalPrice: filteredByCategory[category],
  }));
  data.sort((a, b) => b.totalPrice - a.totalPrice);
  return (
    <Card title="Order Chats" className="order-chats">
      <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Total price by category
      </h3>
      <DonutChart
        className="mt-8"
        data={data}
        category="totalPrice"
        index="category"
        valueFormatter={(value) => currencyFormatter(value, "TRY")}
        colors={["cyan", "blue", "indigo", "violet", "fuchsia"]}
      />
      <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
        <span>Category</span>
        <span>Amount / Share</span>
      </p>
      <List className="mt-2">
        {data.map((item, index) => (
          <ListItem key={index} className="space-x-6">
            <div className="flex items-center space-x-2.5 truncate">
              <span>-</span>
              <span className="truncate dark:text-dark-tremor-content-emphasis">
                {item.category}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.category}
              </span>
              <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                {currencyFormatter(item.totalPrice, "TRY")}
              </span>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default OrderChartsCategory;

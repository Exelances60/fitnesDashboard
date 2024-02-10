"use client";
import { orderDonutChartType } from "@/models/dataTypes";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { Card, DonutChart, Grid, List, ListItem } from "@tremor/react";
import React from "react";

type OrderChatsProps = {
  chartsDonutData: orderDonutChartType[];
};

const OrderChats = ({ chartsDonutData }: OrderChatsProps) => {
  const [selected, setSelected] = React.useState<orderDonutChartType | null>(
    null
  );

  return (
    <Grid numItems={1} numItemsSm={1} numItemsLg={2} className="gap-2">
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
            valueFormatter={currencyFormatter}
            onValueChange={(value) => setSelected(value)}
            colors={["cyan", "blue", "indigo", "violet", "fuchsia"]}
          />
        </div>
        <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span>Category</span>
          <span>Price / Share</span>
        </p>
        <List className="mt-2">
          {chartsDonutData.map((item, index) => (
            <ListItem key={index} className="space-x-6">
              <div className="flex items-center space-x-2.5 truncate">
                <span>-</span>
                <span className="truncate dark:text-dark-tremor-content-emphasis">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {currencyFormatter(item.price)} x {item.amountOrder}
                </span>
                <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                  {currencyFormatter(item.totalPrice)}
                </span>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
      <Card title="Order Chats" className="order-chats">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Total amount by category
        </h3>
        <DonutChart
          className="mt-8"
          data={chartsDonutData}
          category="amountOrder"
          index="name"
          valueFormatter={currencyFormatter}
          colors={["cyan", "blue", "indigo", "violet", "fuchsia"]}
        />
        <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span>Category</span>
          <span>Amount / Share</span>
        </p>
      </Card>
    </Grid>
  );
};

export default OrderChats;

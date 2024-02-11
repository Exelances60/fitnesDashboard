"use client";
import { orderDonutChartType } from "@/models/dataTypes";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { Card, DonutChart, Grid, List, ListItem } from "@tremor/react";
import React from "react";
import OrderChartsList from "./OrderChartsList";
import OrderChartsSelectedDetails from "./OrderChartsSelectedDetails";

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

        {selected ? <OrderChartsSelectedDetails selected={selected} /> : null}

        <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span>Category</span>
          <span>Price / Share</span>
        </p>
        <List className="mt-2">
          {chartsDonutData.map((item, index) => (
            <ListItem key={index} className="space-x-6">
              <OrderChartsList item={item} />
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

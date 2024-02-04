"use client";
import { AreaChart, Card } from "@tremor/react";
import React from "react";

const data = [
  {
    date: "Jan 20",
    value: 100,
  },
  {
    date: "Feb 23",
    value: 120,
  },
  {
    date: "Enes 30",
    value: 130,
  },
];

const DashboardCharts = () => {
  return (
    <Card>
      <AreaChart
        className="h-96 w-full"
        data={data}
        colors={["indigo-300"]}
        index="date"
        yAxisWidth={30}
        categories={["value"]}
        title="Sales"
      ></AreaChart>
    </Card>
  );
};

export default DashboardCharts;

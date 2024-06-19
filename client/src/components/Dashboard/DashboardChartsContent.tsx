"use client";
import { Card } from "@tremor/react";
import React, { useState } from "react";
import DashboardChartsSelect from "./DashboardChartsSelect";
import DashboardCharts from "./DashboardCharts";

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

const DashboardChartsContent = () => {
  const [chartsData, setChartsData] = useState(data);
  return (
    <Card>
      <DashboardChartsSelect setChartsData={setChartsData} />
      <DashboardCharts data={chartsData} />
    </Card>
  );
};

export default DashboardChartsContent;

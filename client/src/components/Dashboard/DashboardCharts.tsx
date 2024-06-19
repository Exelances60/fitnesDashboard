import React from "react";
import { AreaChart } from "@tremor/react";

interface DashboardChartsProps {
  data: any;
}

const DashboardCharts = ({ data }: DashboardChartsProps) => {
  return (
    <AreaChart
      className="h-96 w-full"
      data={data}
      colors={["indigo-300"]}
      index="date"
      yAxisWidth={60}
      categories={["value"]}
      title="Dashboard Charts"
    ></AreaChart>
  );
};

export default DashboardCharts;

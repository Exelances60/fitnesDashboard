import React from "react";
import { AreaChart, LineChart, BarChart } from "@tremor/react";
import { useAppSelector } from "@/store/store";
import { selectChartsMode } from "@/store/slices/dashboardSlice";

interface DashboardChartsProps {
  data: {
    date: string;
    value: number;
  }[];
}

const DashboardCharts = ({ data }: DashboardChartsProps) => {
  const selectedView = useAppSelector(selectChartsMode);
  return (
    <>
      {selectedView === "area" && (
        <AreaChart
          className="h-96 w-full"
          data={data}
          colors={["indigo-300"]}
          index="date"
          yAxisWidth={60}
          categories={["value"]}
          title="Dashboard Charts"
        ></AreaChart>
      )}
      {selectedView === "line" && (
        <LineChart
          className="h-96 w-full"
          data={data}
          colors={["indigo-300"]}
          index="date"
          yAxisWidth={60}
          categories={["value"]}
          title="Dashboard Charts"
        ></LineChart>
      )}
      {selectedView === "bar" && (
        <BarChart
          className="h-96 w-full"
          data={data}
          colors={["indigo-300"]}
          index="date"
          yAxisWidth={60}
          categories={["value"]}
          title="Dashboard Charts"
        ></BarChart>
      )}
    </>
  );
};

export default DashboardCharts;

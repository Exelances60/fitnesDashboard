import React from "react";
import { AreaChart, LineChart, BarChart } from "@tremor/react";
import { useAppSelector } from "@/store/store";
import { selectChartsMode } from "@/store/slices/dashboardSlice";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

interface DashboardChartsProps {
  data: {
    date: string;
    value: number;
  }[];
}

const DashboardCharts = ({ data }: DashboardChartsProps) => {
  const selectedView = useAppSelector(selectChartsMode);
  const { renderCurrency } = useCurrencyFormatter();
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
          valueFormatter={(value) => {
            return renderCurrency(value);
          }}
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
          valueFormatter={(value) => {
            return renderCurrency(value);
          }}
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
          valueFormatter={(value) => {
            return renderCurrency(value);
          }}
        ></BarChart>
      )}
    </>
  );
};

export default DashboardCharts;

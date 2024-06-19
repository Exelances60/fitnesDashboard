import React, { useState } from "react";
import { AreaChart, LineChart, BarChart } from "@tremor/react";
import { SettingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/store";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import DashboardSelect from "./DashboardSelect";

interface DashboardChartsProps {
  data: {
    date: string;
    value: number;
  }[];
}

const DashboardCharts = ({ data }: DashboardChartsProps) => {
  const [selectedView, setSelectedView] = useState("area");
  const dispatch = useAppDispatch();
  const handleSettingClick = () => {
    dispatch(
      setShowDrawer({
        title: "Dashboard Charts",
        children: <DashboardSelect setSelectedView={setSelectedView} />,
      })
    );
  };
  return (
    <>
      <div className="absolute right-2 top-2 text-lg">
        <SettingOutlined
          className="text-gray-500 cursor-pointer drop-shadow-md	hover:scale-105 transform transition duration-300 rounded-full  bg-white"
          onClick={handleSettingClick}
        />
      </div>
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

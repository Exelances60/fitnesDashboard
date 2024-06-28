"use client";
import { Card } from "@tremor/react";
import React, { useState } from "react";
import DashboardChartsSelect from "./DashboardChartsSelect";
import DashboardCharts from "./DashboardCharts";
import { Spin } from "antd";

const DashboardChartsContent = () => {
  const [chartsData, setChartsData] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <Card>
      <DashboardChartsSelect
        setChartsData={setChartsData}
        setLoading={setLoading}
      />
      <Spin spinning={loading}>
        <DashboardCharts data={chartsData} />
      </Spin>
    </Card>
  );
};

export default DashboardChartsContent;

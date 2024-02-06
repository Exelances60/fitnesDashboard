import DashboardCharts from "@/components/Dashboard/DashboardCharts";
import DashboardOrdersList from "@/components/Dashboard/DashboardOrdersList";
import React from "react";
import DashboardCard from "@/components/Dashboard/DashboardCard";

const Dashboard = () => {
  return (
    <div className="gap-2 flex flex-col">
      <DashboardCard />
      <DashboardCharts />
      <DashboardOrdersList />
    </div>
  );
};

export default Dashboard;

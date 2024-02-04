import DashboardCharts from "@/components/Dashboard/DashboardCharts";
import DashboardOrdersList from "@/components/Dashboard/DashboardOrdersList";
import DndCard from "@/components/Dashboard/DndCard";
import React from "react";

const Dashboard = () => {
  return (
    <div className="gap-2 flex flex-col">
      <DndCard />
      <DashboardCharts />
      <DashboardOrdersList />
    </div>
  );
};

export default Dashboard;

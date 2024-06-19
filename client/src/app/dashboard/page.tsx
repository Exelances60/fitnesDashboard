import React from "react";
import DashboardOrdersList from "@/components/Dashboard/DashboardOrdersList";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import DashboardChartsContent from "@/components/Dashboard/DashboardChartsContent";

const Dashboard = async () => {
  return (
    <div className="gap-2 flex flex-col">
      <DashboardCard />
      <DashboardChartsContent />
      <DashboardOrdersList />
    </div>
  );
};

export default Dashboard;

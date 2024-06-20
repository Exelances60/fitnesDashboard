import React from "react";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import DashboardChartsContent from "@/components/Dashboard/DashboardChartsContent";
import DashboardFastTable from "@/components/Dashboard/DashboardFastTable";

const Dashboard = async () => {
  return (
    <div className="gap-2 flex flex-col">
      <DashboardCard />
      <DashboardChartsContent />
      <DashboardFastTable />
    </div>
  );
};

export default Dashboard;

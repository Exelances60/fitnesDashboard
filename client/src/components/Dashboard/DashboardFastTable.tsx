"use client";
import { selectFastTable } from "@/store/slices/dashboardSlice";
import { useAppSelector } from "@/store/store";
import { Card } from "@tremor/react";
import React from "react";
import DashbordFastProduct from "./DashbordFastProduct";
import DashboardFastOrder from "./DashboardFastOrder";
import DashboardFastEmployee from "./DashboardFastEmployee";
import DashboardFastCustomer from "./DashboardFastCustomer";

const DashboardFastTable = () => {
  const fastTable = useAppSelector(selectFastTable);
  return (
    <Card>
      {fastTable === "product" && <DashbordFastProduct />}
      {fastTable === "order" && <DashboardFastOrder />}
      {fastTable === "employee" && <DashboardFastEmployee />}
      {fastTable === "customer" && <DashboardFastCustomer />}
    </Card>
  );
};

export default DashboardFastTable;

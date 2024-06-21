"use client";
import { selectFastTable } from "@/store/slices/dashboardSlice";
import { useAppSelector } from "@/store/store";
import { Card } from "@tremor/react";
import React from "react";
import DashbordFastProduct from "./DashbordFastProduct";
import DashboardFastOrder from "./DashboardFastOrder";
import DashboardFastEmployee from "./DashboardFastEmployee";
import DashboardFastCustomer from "./DashboardFastCustomer";
import useGetTokenPayload from "@/hooks/useGetTokenPayload";
import {
  customersRole,
  employeesRole,
  ordersRole,
  productsRole,
} from "@/mock/navMenu";

const DashboardFastTable = () => {
  const fastTable = useAppSelector(selectFastTable);
  const userInfo = useGetTokenPayload();

  const checkRole = (roleArray: string[], role: string | undefined) => {
    return roleArray.includes(role as string);
  };

  const notAuthorized = () => {
    return (
      <div className="flex items-center justify-center h-40 text-2xl text-red-500">
        Not Authorized for this table
      </div>
    );
  };

  const renderContent = () => {
    switch (fastTable) {
      case "product":
        return checkRole(productsRole, userInfo?.role) ? (
          <DashbordFastProduct />
        ) : (
          notAuthorized()
        );
      case "order":
        return checkRole(ordersRole, userInfo?.role) ? (
          <DashboardFastOrder />
        ) : (
          notAuthorized()
        );
      case "employee":
        return checkRole(employeesRole, userInfo?.role) ? (
          <DashboardFastEmployee />
        ) : (
          notAuthorized()
        );
      case "customer":
        return checkRole(customersRole, userInfo?.role) ? (
          <DashboardFastCustomer />
        ) : (
          notAuthorized()
        );
      default:
        return null;
    }
  };

  return <Card>{renderContent()}</Card>;
};

export default DashboardFastTable;

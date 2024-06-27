import useFetchCustomerDataForClient from "@/hooks/useFetchCustomerDataForClient";
import { Spin } from "antd";
import React from "react";
import CustomerTable from "../Customer/CustomerTable/CustomerTable";

const DashboardFastCustomer = () => {
  const customer = useFetchCustomerDataForClient();
  return (
    <Spin spinning={customer.length === 0}>
      <CustomerTable customers={customer} />
    </Spin>
  );
};

export default DashboardFastCustomer;

import { Card } from "@tremor/react";
import React from "react";
import CustomerContainerHeader from "./CustomerContainerHeader";
import CustomerTable from "./CustomerTable/CustomerTable";
import { fetchCustomer } from "@/actions/fetchCustomer";

const CustomerContainer = async () => {
  const data = await fetchCustomer();

  return (
    <Card className="overflow-auto flex flex-col gap-2">
      <CustomerContainerHeader />
      <CustomerTable customers={data || []} />
    </Card>
  );
};

export default CustomerContainer;

import { Card } from "@tremor/react";
import React from "react";
import CustomerContainerHeader from "./CustomerContainerHeader";
import CustomerTable from "./CustomerTable/CustomerTable";
import { fetchCustomer } from "@/actions/fetchCustomer";
import { fetchExersice } from "@/actions/fetchExersice";

const CustomerContainer = async () => {
  const [data, exersice] = await Promise.all([
    fetchCustomer(),
    fetchExersice(),
  ]);

  return (
    <Card className="overflow-auto flex flex-col gap-2">
      <CustomerContainerHeader />
      <CustomerTable customers={data} exersice={exersice} />
    </Card>
  );
};

export default CustomerContainer;

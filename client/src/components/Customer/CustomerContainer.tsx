import { Card } from "@tremor/react";
import React from "react";
import CustomerContainerHeader from "./CustomerContainerHeader";
import CustomerTable from "./CustomerTable/CustomerTable";
import { fetchCustomer } from "@/actions/fetchCustomer";
import ErrorPage from "../ErrorPage";

const CustomerContainer = async () => {
  const { data, error } = await fetchCustomer();

  if (error) {
    return <ErrorPage error={error} status="500" title="Error" key={error} />;
  }

  return (
    <Card className="overflow-auto flex flex-col gap-2 ">
      <CustomerContainerHeader />
      <CustomerTable customers={data} />
    </Card>
  );
};

export default CustomerContainer;

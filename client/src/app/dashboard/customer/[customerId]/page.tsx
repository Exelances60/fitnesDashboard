import { fetchFindCustomer } from "@/actions/fetchFindCustomer";
import CustomerDetailsContainer from "@/components/Customer/CustomerDetailsPage/CustomerDetailsContainer";
import ErrorPage from "@/components/ErrorPage";
import React from "react";

const CustomerDetails = async ({
  params,
}: {
  params: { customerId: string };
}) => {
  const [customer] = await Promise.all([fetchFindCustomer(params.customerId)]);

  if (customer.error) {
    return <ErrorPage error={customer.error} title="Error" status="error" />;
  }

  return (
    <div>
      <CustomerDetailsContainer customer={customer} />
    </div>
  );
};

export default CustomerDetails;

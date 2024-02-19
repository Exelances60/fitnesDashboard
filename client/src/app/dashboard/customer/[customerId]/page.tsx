import { fetchFindCustomer } from "@/actions/fetchFindCustomer";
import CustomerDetailsContainer from "@/components/Customer/CustomerDetailsPage/CustomerDetailsContainer";
import Link from "next/link";
import React from "react";

const CustomerDetails = async ({
  params,
}: {
  params: { customerId: string };
}) => {
  const customer = await fetchFindCustomer(params.customerId);

  if (!customer) {
    return (
      <div className="flex flex-col">
        Customer not found
        <Link href="/dashboard/customer">Go back to customer list</Link>
      </div>
    );
  }

  return (
    <div>
      <CustomerDetailsContainer customer={customer} />
    </div>
  );
};

export default CustomerDetails;

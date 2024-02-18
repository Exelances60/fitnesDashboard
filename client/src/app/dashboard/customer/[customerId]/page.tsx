import { fetchFindCustomer } from "@/actions/fetchFindCustomer";
import CustomerSlugContainer from "@/components/Customer/CustomerDetailsPage/CustomerSlugContainer";
import Link from "next/link";
import React from "react";

const CustomerDetails = async ({
  params,
}: {
  params: { customerId: string };
}) => {
  const customer = await fetchFindCustomer(params.customerId);
  console.log(customer);

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
      <CustomerSlugContainer customer={customer} />
    </div>
  );
};

export default CustomerDetails;

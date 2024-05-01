import fetchOrder from "@/actions/fetchOrder";
import ErrorPage from "@/components/ErrorPage";
import InvoiceContainer from "@/components/Invoice/InvoiceContainer";
import React from "react";

const Invoice = async () => {
  const { orders, errorMessage } = await fetchOrder();
  if (errorMessage) {
    return (
      <ErrorPage
        title="Failed to fetch orders"
        error={errorMessage}
        status="404"
      />
    );
  }
  const data = orders.filter((order) => order.status === "Completed");

  return (
    <div className="flex flex-col gap-2">
      <InvoiceContainer data={data} />
    </div>
  );
};

export default Invoice;

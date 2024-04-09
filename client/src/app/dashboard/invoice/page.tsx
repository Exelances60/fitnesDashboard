import fetchOrder from "@/actions/fetchOrder";
import InvoiceContainer from "@/components/Invoice/InvoiceContainer";
import React from "react";

const Invoice = async () => {
  const { orders } = await fetchOrder();
  const data = orders.filter((order) => order.status === "Completed");

  return (
    <div className="flex flex-col gap-2">
      <InvoiceContainer data={data} />
    </div>
  );
};

export default Invoice;

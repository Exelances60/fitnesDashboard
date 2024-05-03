import { fetchCustomer } from "@/actions/fetchCustomer";
import React, { useEffect, useState } from "react";

const useFetchCustomerDataForClient = () => {
  const [customerData, setCustomerData] = useState<CustomerType[]>([]);
  useEffect(() => {
    const fetchCustomerData = async () => {
      const { data, error } = await fetchCustomer();
      if (error) {
        return <div>{error}</div>;
      }
      setCustomerData(data);
    };
    fetchCustomerData();
  }, []);
  return customerData;
};

export default useFetchCustomerDataForClient;

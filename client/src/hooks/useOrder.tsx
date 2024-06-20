import fetchOrder from "@/actions/fetchOrder";
import React from "react";

const useOrders = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const fetchOrders = async () => {
      const { orders } = await fetchOrder();
      setOrders(orders);
    };
    fetchOrders();
  }, []);

  return orders;
};

export default useOrders;

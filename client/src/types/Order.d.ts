import { Global } from "../global";

export type AddOrderFormType = {
  product: string;
  quantity: number;
  price: number;
  customer: string;
  orderDate: string;
  deliveryDate: string;
  status: string;
};

export type OrdersType = {
  _id: string;
  amount: number;
  products: productsType[];
  adress: string;
  totalPrice: number;
  status: "Pending" | "Completed" | "Cancelled" | "Preparing";
  orderOwner: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
  creator: string;
  orderOwnerEmail: string;
};

export type orderDonutChartType = Global.OrderDonutChartType;

export type getOrdersType = {
  orders: Global.ordersType[];
  chartsData: orderDonutChartType[];
};

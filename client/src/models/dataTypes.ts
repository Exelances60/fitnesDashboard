export type jwtUserDecode = {
  email: string;
  ownerId: string;
  companyName: string;
  iat: number;
  exp: number;
  productCategory: string[];
  _id: string;
};

export type productsType = {
  _id: string;
  name: string;
  price: number;
  amount: number;
  description: string;
  imageUrl: string;
  ownerId: string;
  category: string;
};

export type ordersType = {
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

export type orderDonutChartType = {
  name: string;
  category: string;
  price: number;
  amount: number;
  totalPrice: number;
  amountOrder: number;
};

export type getOrdersType = {
  orders: ordersType[];
  chartsData: orderDonutChartType[];
};

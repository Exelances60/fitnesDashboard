type AddOrderFormType = {
  product: string;
  quantity: number;
  price: number;
  customer: string;
  orderDate: string;
  deliveryDate: string;
  status: string;
};

type OrdersType = {
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
  orderImage: string;
  orderCategory: string;
};

type orderDonutChartType = Global.OrderDonutChartType;

type CardDataType = {
  totalOrders: number;
  totalSalesPrice: number;
  increasePercentageForSales: number;
  totalSalesCompleted: number;
  increasePercentageForAmount: number;
  increasePercentageForCompletedSales: number;
};
type ordersType = {
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

type getOrdersType = {
  orders: ordersType[] | [];
  chartsData: orderDonutChartType[];
  cardData: CardDataType;
};

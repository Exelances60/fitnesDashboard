export type jwtUserDecode = {
  email: string;
  ownerId: string;
  companyName: string;
  iat: number;
  exp: number;
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
};

export type ordersType = {
  _id: string;
  amount: number;
  products: productsType[];
  adress: string;
  totalPrice: number;
  status: string;
  orderOwner: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
  creator: string;
};

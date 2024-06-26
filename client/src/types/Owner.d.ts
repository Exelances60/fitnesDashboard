interface OwnerType {
  _id: string;
  email: string;
  password: string;
  companyName: string;
  address: string;
  phone: string;
  employees: string[];
  customer: string[];
  role: string;
  product: string[];
  orders: string[];
  productCategory: string[];
  ownerImage?: string;
  memberShipList?: string[];
  memberShipPrice: number | string;
  memberShipMonths: number[];
}

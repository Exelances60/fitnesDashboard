/* type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>;
 */
type FileType = {
  uid: string;
  name: string;
  status?: string;
  response?: string;
  originFileObj?: File;
};

export type addCustomerFormType = {
  image: FileType[];
  name: string;
  phone: string;
  email: string;
  age: number;
  bodyWeight: number;
  height: number;
  membershipMonths: number;
  membershipPrice: number;
  membershipStatus: string;
  coach: string;
  address: string;
  bloodGroup: string;
  parentPhone: string;
};

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
  orderId: string;
};

export type getOrdersType = {
  orders: ordersType[];
  chartsData: orderDonutChartType[];
};

export type CustomerType = {
  _id: string;
  name: string;
  phone: number;
  email: string;
  coachPT: string | null;
  age: number;
  bodyWeight: number;
  height: number;
  membershipPrice: number;
  membershipStartDate: string;
  membershipEndDate: string;
  membershipType: string;
  membershipStatus: "standart" | "passive" | "vip";
  ownerId: string;
  profilePicture: string;
  exercisePlan: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ExerciseType = {
  _id: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  name: string;
  secondaryMuscle: string[];
  instructions: string[];
};

export type updateCustomerFormType = {
  age: number;
  bodyWeight: number;
  coach: string;
  email: string;
  exercisePlan: string[];
  height: number;
  membershipMonths: string;
  membershipPrice: number;
  membershipStatus: string;
  name: string;
  phone: string;
};

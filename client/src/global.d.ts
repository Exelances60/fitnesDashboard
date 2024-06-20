declare namespace Global {
  export type FileType = {
    uid: string;
    name: string;
    status?: string;
    response?: string;
    originFileObj?: File;
  };

  export type JwtUserDecode = {
    email: string;
    ownerId: string;
    companyName: string;
    iat: number;
    exp: number;
    productCategory: string[];
    _id: string;
  };

  export type ProductsType = {
    _id: string;
    name: string;
    price: number;
    amount: number;
    description: string;
    imageUrl: string;
    ownerId: string;
    category: string;
    createdAt: string;
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

  export type OrderDonutChartType = {
    name: string;
    category: string;
    price: number;
    amount: number;
    totalPrice: number;
    amountOrder: number;
    orderId: string;
  };

  export type FetchExerciseType = {
    exercises: ExerciseType[] | [];
    totalExercisesCount: number;
    currentPage: number;
    pageSize: number;
  };
}

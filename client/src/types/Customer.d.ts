import { Global } from "../global";

export type AddCustomerFormType = {
  image: Global.FileType[];
  phone: string;
  email: string;
  name: string;
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
  parentPhone: string;
  bloodGroup: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UpdateCustomerFormType = {
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

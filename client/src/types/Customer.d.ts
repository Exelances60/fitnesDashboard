type AddCustomerFormType = {
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

interface CustomerType {
  _id: string;
  name: string;
  phone: number;
  email: string;
  coachPT?: IEmployee | string;
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
  exercisePlan: string[] | ExerciseType[];
  parentPhone: string;
  bloodGroup: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  calendarAcv?: CalenderActType[];
  __v: number;
}

type UpdateCustomerFormType = {
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

type CustomerActivityType = {
  _id: string;
  date: string;
  type: string;
  text: string;
  color: string;
};

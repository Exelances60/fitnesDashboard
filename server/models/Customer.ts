import { Schema, model, Types } from "mongoose";
import { IExercise } from "./Exercise";

const ModelSchema = Schema;

export interface ICustomer extends Document {
  _id: Types.ObjectId;
  name: string;
  phone: number;
  parentPhone: number;
  email: string;
  address: string;
  bloodGroup: string;
  coachPT: Types.ObjectId | null;
  age: number;
  bodyWeight: number;
  height: number;
  membershipPrice: number;
  membershipStartDate: Date;
  membershipEndDate: Date;
  membershipType: number;
  membershipStatus: string;
  gender: string;
  exercisePlan: string[] | IExercise[];
  ownerId: Types.ObjectId;
  profilePicture: string;
  calendarAcv: Types.ObjectId[];
}

const customerSchema = new ModelSchema<ICustomer>(
  {
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    parentPhone: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    bloodGroup: {
      type: String,
      require: true,
    },
    coachPT: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    age: {
      type: Number,
      require: true,
    },
    bodyWeight: {
      type: Number,
      require: true,
    },
    height: {
      type: Number,
      require: true,
    },
    membershipPrice: {
      type: Number,
      require: true,
    },
    membershipStartDate: {
      type: Date,
      require: true,
    },
    membershipEndDate: {
      type: Date,
      require: true,
    },
    membershipType: {
      type: Number,
      require: true,
    },
    membershipStatus: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    exercisePlan: [
      {
        type: String,
      },
    ],
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    profilePicture: {
      type: String,
      require: true,
    },
    calendarAcv: [
      {
        type: Schema.Types.ObjectId,
        ref: "CalenderAcv",
      },
    ],
  },
  { timestamps: true }
);

const Customer = model<ICustomer>("Customer", customerSchema);

export default Customer;

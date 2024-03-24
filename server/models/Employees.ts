import { Types } from "mongoose";
import { Schema, model } from "mongoose";

const ModelSchema = Schema;

export interface IEmployee {
  _id: Types.ObjectId;
  profilePicture?: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  position: string;
  address: string;
  hireDate: Date;
  salary: number;
  university: string;
  education: string;
  documents: string[];
  ownerId: Schema.Types.ObjectId;
  customers: Schema.Types.ObjectId[];
}

const employeeSchema = new ModelSchema<IEmployee>({
  profilePicture: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  position: {
    type: String,
  },
  address: {
    type: String,
  },
  hireDate: {
    type: Date,
  },
  salary: {
    type: Number,
  },
  university: {
    type: String,
  },
  education: {
    type: String,
  },
  documents: {
    type: Array.of(String),
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
  ],
});

const Employee = model<IEmployee>("Employee", employeeSchema);

export default Employee;

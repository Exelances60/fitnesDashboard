import { Schema, Document, model, Types } from "mongoose";

const ModelSchema = Schema;

interface IOwner extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  companyName: string;
  address: string;
  phone: string;
  employees: Types.ObjectId[];
  customer: Types.ObjectId[];
  role: string;
  product: Types.ObjectId[];
  orders: Types.ObjectId[];
  productCategory?: string[];
  ownerImage?: string;
  memberShipList?: string[];
  memberShipPrice?: number;
  memberShipMonths?: number[];
}

const ownerSchema = new ModelSchema<IOwner>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  customer: [
    {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
  ],
  role: {
    type: String,
    required: true,
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  productCategory: [
    {
      type: String,
    },
  ],
  ownerImage: {
    type: String,
  },
  memberShipList: [
    {
      type: String,
    },
  ],
  memberShipPrice: {
    type: Number,
  },
  memberShipMonths: [
    {
      type: Number,
    },
  ],
});

const Owner = model<IOwner>("Owner", ownerSchema);

export default Owner;

import { Schema, model, Types } from "mongoose";

const ModelSchema = Schema;

export interface IOrder extends Document {
  _id: Types.ObjectId;
  adress: string;
  status: string;
  totalPrice: number;
  productsId: Types.ObjectId[];
  orderOwner: string;
  phone: number;
  orderOwnerEmail: string;
  creator: Types.ObjectId;
  amount: number;
  orderImage?: string;
  orderCategory?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new ModelSchema<IOrder>(
  {
    adress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    productsId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    orderOwner: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    orderOwnerEmail: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderImage: {
      type: String,
    },
    orderCategory: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;

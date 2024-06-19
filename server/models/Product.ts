import { Schema, Types, model } from "mongoose";

const ModelSchema = Schema;

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  ownerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new ModelSchema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;

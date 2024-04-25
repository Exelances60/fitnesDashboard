import { Schema, Document, Types, model } from "mongoose";

const ModelSchema = Schema;

export interface IPendingAccount extends Document {
  email: string;
  companyName: string;
  address: string;
  password: string;
  phone: string;
  ownerImage: string;
  _id: string | Types.ObjectId;
  status: string;
}

const pendingAccountSchema = new ModelSchema<IPendingAccount>({
  email: {
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
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  ownerImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const PendingAccount = model<IPendingAccount>(
  "PendingAccount",
  pendingAccountSchema
);

export default PendingAccount;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
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
});

module.exports = mongoose.model("Owner", ownerSchema);

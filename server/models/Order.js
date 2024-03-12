const moongose = require("mongoose");

const Schema = moongose.Schema;

const orderSchema = new Schema(
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
  },
  { timestamps: true }
);

module.exports = moongose.model("Order", orderSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  coachPT: {
    type: Schema.Types.ObjectId,
    ref: "Employees",
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
    type: String,
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
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);

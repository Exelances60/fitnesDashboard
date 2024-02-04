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
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
  ],
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Owner", ownerSchema);

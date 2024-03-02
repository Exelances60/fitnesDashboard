const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
    type: Array,
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

module.exports = mongoose.model("Employee", employeeSchema);

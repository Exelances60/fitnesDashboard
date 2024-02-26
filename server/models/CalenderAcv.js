const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calenderAcvSchema = new Schema({
  date: {
    type: Date,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    require: true,
  },
});

module.exports = mongoose.model("CalenderAcv", calenderAcvSchema);

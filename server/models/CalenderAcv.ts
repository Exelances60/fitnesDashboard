import { Schema, Types, model } from "mongoose";

export interface ICalenderAcv {
  _id: Types.ObjectId;
  date: Date;
  text: string;
  type: string;
  color: string;
  customerId: Types.ObjectId;
}

const calenderAcvSchema = new Schema<ICalenderAcv>({
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

const CalenderAcv = model<ICalenderAcv>("CalenderAcv", calenderAcvSchema);

export default CalenderAcv;

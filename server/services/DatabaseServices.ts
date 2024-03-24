import mongoose from "mongoose";
import { MONGODB_URI } from "../config";
export default async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

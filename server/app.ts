import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
import customerRoutes from "./routes/customer";
import exercisesRoutes from "./routes/exercises";
import calendarActRoutes from "./routes/calenderAct";
import employeeRoutes from "./routes/employees";

const app = express();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vs0ffby.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}); */

app.use(helmet());

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/customers", customerRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/calendarAct", calendarActRoutes);
app.use("/employees", employeeRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.statusCode || 500; // eğer status kodu yoksa 500 döndürür
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000);
    console.log("Connected!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

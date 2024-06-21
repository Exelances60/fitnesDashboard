import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import {
  authRoutes,
  dashboardRoutes,
  calendarActRoutes,
  customerRoutes,
  employeeRoutes,
  exercisesRoutes,
  orderRoutes,
  productRoutes,
  inboxRoutes,
} from "../routes";

export default async (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const corsOptions = {
    origin: "http://localhost:3000" || "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));
  app.use(helmet());

  app.use("/auth", authRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/products", productRoutes);
  app.use("/orders", orderRoutes);
  app.use("/customers", customerRoutes);
  app.use("/exercises", exercisesRoutes);
  app.use("/calendarAct", calendarActRoutes);
  app.use("/employees", employeeRoutes);
  app.use("/inbox", inboxRoutes);

  return app;
};

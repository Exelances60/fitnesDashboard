import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import dbConnection from "./services/DatabaseServices";
import App from "./services/ExpressAppServices";
import { PORT } from "./config";
import { MongoDBDatabase } from "./services/DatabaseServices/MongoDBDatabase";

const StartServer = async () => {
  const app = express();

  /* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}); */

  if (process.env.DATABASE_TYPE === "MONGODB") {
    await dbConnection();
  }

  await App(app);

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const status = error.statusCode || 500; // eğer status kodu yoksa 500 döndürür
    const message = error.message;
    const data = error.data;

    res.status(status).json({ message: message, data: data });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

StartServer();

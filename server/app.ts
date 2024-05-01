import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import dbConnection from "./services/DatabaseServices";
import App from "./services/ExpressAppServices";
import path from "path";
import { PORT } from "./config";

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
  app.use("/images", express.static(path.join(__dirname, "images")));

  await dbConnection();
  await App(app);

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    let message = error.message;
    const status = error.statusCode || 500; // eğer status kodu yoksa 500 döndürür
    const data = error.data;
    if (error.message.includes("Cast to ObjectId failed")) {
      message = "Invalid id";
    }
    if (error.message.includes("jwt expired")) {
      message = "Token expired";
    }

    res.status(status).json({ errorMessage: message, data: data });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

StartServer();

import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import dbConnection from "./services/DatabaseServices";
import App from "./services/ExpressAppServices";
import path from "path";
import { PORT } from "./config";
import { socket } from "./utils/socket";
const app = express();
app.use("/images", express.static(path.join(__dirname, "images")));

const StartServer = async () => {
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

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  socket(server);
};

StartServer();

export default app;

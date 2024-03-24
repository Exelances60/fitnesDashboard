import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
    }
  }
}
interface decocedToken {
  ownerId: string;
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.") as any;
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as decocedToken;
  } catch (error: any) {
    error.statusCode = 500;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.") as any;
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.ownerId;
  next();
};

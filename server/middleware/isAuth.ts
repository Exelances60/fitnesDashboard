import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwtServices from "../utils/jwtServices";
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
  try {
    const decodedToken = jwtServices.verifyToken(token) as decocedToken;
    if (!decodedToken) {
      const error = new Error("Not authenticated.") as any;
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.ownerId;
    next();
  } catch (error: any) {
    error.statusCode = 500;
    throw error;
  }
};

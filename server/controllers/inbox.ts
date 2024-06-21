import { Request, Response, NextFunction } from "express";
import { InboxServices } from "../services/InboxServices";

export const getInbox = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inbox = await new InboxServices().getInbox(req);
    res.status(200).json(inbox);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

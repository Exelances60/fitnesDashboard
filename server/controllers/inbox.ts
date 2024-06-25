import { Request, Response, NextFunction } from "express";
import { InboxServices } from "../services/InboxServices";

export const getInbox = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inbox = await new InboxServices().getInbox(req);
    res.status(200).json({
      message: "Inbox fetched successfully",
      inbox,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chat = await new InboxServices().createChat(req);
    res.status(201).json({
      message: "Chat created successfully",
      chat,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await new InboxServices().deleteMessage(req);
    res.status(200).json({
      message: "Message deleted successfully",
      data,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chat = await new InboxServices().getChat(req);
    res.status(200).json({
      message: "Chat fetched successfully",
      chat,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

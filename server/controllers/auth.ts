import { Request, Response, NextFunction } from "express";
import Owner from "../models/Owner";
import "dotenv/config";
import { validationResult } from "express-validator";
import throwValidationError from "../utils/err/throwValidationError";
import bcrypt from "bcryptjs";
import { printValidatorErrors } from "../utils/printValidatorErrors";
import { UserServices } from "../services/userService";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    printValidatorErrors(errors);
    const token = await new UserServices().Login(
      req.body.email,
      req.body.password
    );
    res.status(200).json({
      token,
      message: "Login successful!",
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    printValidatorErrors(errors);
    const qrCodeID = await new UserServices().signUpOwner(req);
    res.status(201).json({
      message: "Owner create Request sent.",
      qrCodeID: qrCodeID,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getOwnerInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) return throwValidationError("No user id provided.");
    const owner = await new UserServices().getOwnerInfo(req.userId);
    res.status(200).json({ message: "Owner fetched.", owner: owner });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const updateOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    printValidatorErrors(errors);
    const fetchedOwner = await new UserServices().updateOwnerInfo(req);
    res.status(200).json({ message: "Owner updated!", owner: fetchedOwner });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const uploadOwnerImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseOwner = await new UserServices().uploadOwnerImage(req);
    res.status(201).json({
      message: "Owner Image uploaded.",
      ownerImage: responseOwner.ownerImage,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import Owner from "../models/Owner";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import { validationResult } from "express-validator";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import throwValidationError from "../utils/err/throwValidationError";
import jwtServices from "../utils/jwtServices";
import userServices from "../services/userService";
import firebaseStorageServices from "../utils/FirebaseServices";
import bcrypt from "bcryptjs";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Validation failed, entered data is incorrect.");
    }
    const { email, password } = req.body;
    const owner = await Owner.findOne({ email });
    if (!owner) {
      throw new Error("A owner with this email could not be found.");
    }
    const isPasswordMatch = await jwtServices.comparePassword(
      password,
      owner.password
    );

    if (!isPasswordMatch) {
      throw new Error("Wrong password!");
    }

    const token = jwtServices.signToken({
      email: owner.email,
      ownerId: owner._id.toString(),
      _id: owner._id.toString(),
    });

    res.status(200).json({
      token,
      ownerId: owner._id.toString(),
      message: "Login successful!",
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500; // Set default status code if not provided
    }
    next(err); // Pass the error to the error handling middleware
  }
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }

  const { email, password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const owner = new Owner({
        email,
        password: hashedPw,
        companyName: "test",
        address: "test",
        phone: "1234567890",
      });
      return owner.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Owner created!", ownerId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const getOwnerInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ownerId = req.userId;
  try {
    const owner = await Owner.findById(ownerId).select(
      "email companyName address phone ownerImage productCategory memberShipList memberShipPrice memberShipMonths"
    );
    if (!owner) {
      throwNotFoundError("Could not find owner.");
    }
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }
  if (!req.userId) return;
  const ownerId = req.userId;

  try {
    const fetchedOwner = await userServices.findByIdUpdate(
      ownerId,
      req.body,
      Owner
    );

    if (!fetchedOwner) {
      throwNotFoundError("Could not find owner.");
    }

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
    if (!req.file) {
      throwValidationError("No image provided.");
    }
    const ownerId = req.userId;
    if (!req.file) return;
    const dowlandURLOwnerImage =
      await firebaseStorageServices.uploadImageToStorage(req.file, "owner/");

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return throwNotFoundError("Could not find owner.");
    }
    if (owner && owner.ownerImage) {
      await firebaseStorageServices.deleteImageFromStorage(owner.ownerImage);
    }
    owner.ownerImage = dowlandURLOwnerImage;
    await owner.save();
    res.status(201).json({
      message: "Owner Image uploaded.",
      ownerImage: owner.ownerImage,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

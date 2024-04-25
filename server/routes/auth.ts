import { Router } from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth";
import { isAuth } from "../middleware/isAuth";
import multer from "multer";
import { fileFilter } from "../utils/MulterFileFilter";
import {
  loginValidator,
  updateOwnerValidator,
} from "../Validator/AuthValidate";

const router = Router();

router.post("/login", loginValidator, authController.login);

router.post(
  "/signup",
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).single(
    "ownerImage"
  ),
  authController.signup
);

router.get("/ownerInfo", isAuth, authController.getOwnerInfo);

router.put(
  "/update-owner",
  isAuth,
  updateOwnerValidator,
  authController.updateOwner
);

router.put(
  "/uploadOwnerImage",
  isAuth,
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).single(
    "ownerImage"
  ),
  authController.uploadOwnerImage
);

export { router as authRoutes };

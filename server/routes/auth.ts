import { Router } from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth";
import { isAuth } from "../middleware/isAuth";
import multer from "multer";
import { fileFilter } from "../utils/MulterFileFilter";

const router = Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password is required.& min length is 5."),
  ],
  authController.login
);

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password").trim().isLength({ min: 5 }),
    body("companyName").trim().not().isEmpty(),
  ],
  authController.signup
);

router.get("/ownerInfo", isAuth, authController.getOwnerInfo);

router.put(
  "/update-owner",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("phone")
      .matches(/^[0-9]{10}$/)
      .withMessage("Please enter a valid phone number.")
      .trim(),
    body("memberShipPrice").isInt().withMessage("Please enter a valid price."),
  ],
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

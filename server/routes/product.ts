import { Router, Request } from "express";
import * as productController from "../controllers/product";
import { body } from "express-validator";
import { isAuth } from "../middleware/isAuth";
import multer, { FileFilterCallback } from "multer";
const router = Router();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.post(
  "/add-product",
  isAuth,
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).single(
    "image"
  ),
  productController.addProduct
);

router.get("/get-products", isAuth, productController.getProducts);

router.delete(
  "/delete-product/:productId",
  isAuth,
  productController.deleteProduct
);

router.put(
  "/update-product/:productId",
  isAuth,
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).single(
    "image"
  ),
  productController.updateProduct
);

router.post(
  "/add-product-category",
  [
    body("category")
      .isLength({ min: 3 })
      .withMessage("Category name must be at least 3 characters long."),
  ],
  isAuth,
  productController.addProductCategory
);

export { router as productRoutes };

import { Router } from "express";
import * as productController from "../controllers/product";
import { body } from "express-validator";
import { isAuth } from "../middleware/isAuth";
import multer from "multer";
import { fileFilter } from "../utils/MulterFileFilter";
const router = Router();

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

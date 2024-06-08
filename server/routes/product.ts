import { Router } from "express";
import * as productController from "../controllers/product";
import { isAuth } from "../middleware/isAuth";
import multer from "multer";
import { fileFilter } from "../utils/MulterFileFilter";
import {
  addProductValidator,
  updateProductValidator,
} from "../Validator/Product";
const router = Router();

router.post(
  "/add-product",
  isAuth,
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).single(
    "image"
  ),
  addProductValidator,
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
  updateProductValidator,
  productController.updateProduct
);

export { router as productRoutes };

import { Router, Request } from "express";
import { body } from "express-validator";
import { isAuth } from "../middleware/isAuth";
import multer, { FileFilterCallback } from "multer";
import { ProductController } from "../controllers/Product/ProductController";
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

const controller = new ProductController();

router.post(
  "/add-product",
  isAuth,
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).single(
    "image"
  ),
  controller.onAddProduct
);

router.get("/get-products", isAuth, controller.onGetProducts);

router.delete("/delete-product/:productId", isAuth, controller.onDeleteProduct);

router.put(
  "/update-product/:productId",
  isAuth,
  multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).single(
    "image"
  ),
  controller.onUpdateProduct
);

router.post(
  "/add-product-category",
  [
    body("category")
      .isLength({ min: 3 })
      .withMessage("Category name must be at least 3 characters long."),
  ],
  isAuth,
  controller.onAddProductCategory
);

export { router as productRoutes };

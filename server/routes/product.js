const express = require("express");
const productController = require("../controllers/product");
const { body } = require("express-validator");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
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
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
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
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
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

module.exports = router;

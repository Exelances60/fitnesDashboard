const express = require("express");

const productController = require("../controllers/product");

const router = express.Router();

router.post("/add-product", productController.addProduct);

module.exports = router;

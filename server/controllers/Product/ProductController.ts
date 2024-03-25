import { Request, Response, NextFunction } from "express";
import { IProductInteractor } from "../../interfaces/IProductInteractor";
import { validationResult } from "express-validator";
import throwValidationError from "../../utils/err/throwValidationError";
import throwBadRequestError from "../../utils/err/throwBadRequestError";
import throwNotFoundError from "../../utils/err/throwNotFoundError";
import firebaseStorageServices from "../../services/FirebaseServices";

export class ProductController {
  private interactor: IProductInteractor;
  constructor(interactor: IProductInteractor) {
    this.interactor = interactor;
  }

  async onAddProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throwValidationError("Validation failed, entered data is incorrect.");
      }

      const { productName, price, description, amount, ownerId, category } =
        req.body;

      if (!req.file) {
        return throwBadRequestError("No image provided.");
      }

      const downloadURL = await firebaseStorageServices.uploadImageToStorage(
        req.file,
        "products/"
      );

      const data = await this.interactor.addProduct(req.body);

      /* res.status(201).json({
        message: "Product created successfully!",
        product: result,
        status: 201,
      }); */
    } catch (err: any) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
  async onGetProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.interactor.getProducts();
      res.status(200).json({ products: products });
    } catch (err: any) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
  async onDeleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const product = await this.interactor.getProduct(productId);
      if (!product) {
        return throwNotFoundError("Could not find product.");
      }
      await this.interactor.deleteProduct(productId);
      res.status(200).json({ message: "Product deleted." });
    } catch (err: any) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
  async onUpdateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throwValidationError("Validation failed, entered data is incorrect.");
      }
      const { productName, price, description, amount, ownerId, category } =
        req.body;
      const product = await this.interactor.getProduct(productId);
      if (!product) {
        return throwNotFoundError("Could not find product.");
      }
      const updatedProduct = await this.interactor.updateProduct(
        productId,
        req.body
      );
      res
        .status(200)
        .json({ message: "Product updated.", product: updatedProduct });
    } catch (err: any) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
  async onAddProductCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, ownerId } = req.body;
      await this.interactor.addProductCategory(category, ownerId);
      res.status(201).json({ message: "Category added." });
    } catch (err: any) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
}

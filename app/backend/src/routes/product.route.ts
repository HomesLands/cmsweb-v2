import { productController } from "@controllers";
import { Router } from "express";
export const productRoute: Router = Router();

// [GET] /api/v1/products
productRoute.route("/").get(productController.getAllProducts);

// [GET] /api/v1/products
productRoute.route("/").post(productController.createProduct);

// [PATCH] /api/v1/products
productRoute.route("/").patch(productController.updateProduct);

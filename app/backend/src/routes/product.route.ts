import { upload } from "@configs";
import { productController } from "@controllers";
import { Router } from "express";
export const productRoute: Router = Router();

// [GET] /api/v1/products
productRoute.get("/", productController.getAllProducts);

// [GET] /api/v1/products
productRoute.post("/", productController.createProduct);

// [PATCH] /api/v1/products
productRoute.patch("/", productController.updateProduct);

// [POST] /api/v1/products/upload
productRoute.post(
  "/upload",
  upload.single("file"),
  productController.uploadProduct
);

// [DELETE] /api/v1/products/{slug}
productRoute.route("/:slug").delete(productController.deleteProduct);

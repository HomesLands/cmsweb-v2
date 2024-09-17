import { Router } from "express";
import { productController } from "@controllers"; 
export const productRoute: Router = Router();

productRoute.route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);
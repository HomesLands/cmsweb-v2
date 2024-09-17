import { productController } from "@controllers";
import { Router } from "express";

export const productRoute: Router = Router();

productRoute.get("/", productController.getAllProducts);

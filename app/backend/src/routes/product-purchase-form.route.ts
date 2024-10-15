import { Router } from "express";
import { productPurchaseFormController } from "@controllers";
export const productPurchaseFormRoute: Router = Router();

// [POST] /api/v1/productPurchaseForms
productPurchaseFormRoute.route("/")
  .post(productPurchaseFormController.createProductPurchaseForm);

// [GET] /api/v1/productPurchaseForms
productPurchaseFormRoute.route("/")
  .get(productPurchaseFormController.getAllProductPurchaseForms);
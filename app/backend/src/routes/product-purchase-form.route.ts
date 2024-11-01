import { Router } from "express";
import { productPurchaseFormController } from "@controllers";
export const productPurchaseFormRoute: Router = Router();

// [POST] /api/v1/productPurchaseForms/withoutRequisitionForm
productPurchaseFormRoute.route("/withoutRequisitionForm")
  .post(productPurchaseFormController.createProductPurchaseFormWithoutProductRequisitionForm);

// [POST] /api/v1/productPurchaseForms/fromRequisitionForm
productPurchaseFormRoute.route("/fromRequisitionForm")
  .post(productPurchaseFormController.createProductPurchaseFormFromProductRequisitionForm);

// [GET] /api/v1/productPurchaseForms
productPurchaseFormRoute.route("/")
  .get(productPurchaseFormController.getAllProductPurchaseForms);
import { Router } from "express";

import { requestProductController } from "@controllers";

export const requestProductRoute: Router = Router();

// [POST] /api/v1/requestProducts
requestProductRoute.route("/")
  .post(requestProductController.addNewRequestProductInProductRequisitionForm);

// [PATCH] /api/v1/requestProducts/updateQuantity
requestProductRoute.route("/updateQuantity")
  .patch(requestProductController.changeQuantityRequestProductInProductRequisitionForm);

// [DELETE] /api/v1/requestProducts/:slug
requestProductRoute.route("/:slug")
  .delete(requestProductController.deleteRequestProductInProductRequisitionForm);


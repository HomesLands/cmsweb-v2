import { Router } from "express";
import { productRequisitionFormController } from "@controllers";
import { authMiddleware } from "@middlewares";
import { Action } from "@enums";
import { ProductRequisitionForm } from "@entities";

export const productRequisitionFormRoute: Router = Router();

// [GET] /api/v1/productRequisitionForms/exportPdf/:slug
productRequisitionFormRoute.get(
  "/exportPdf/:slug",
  productRequisitionFormController.exportPdfProductRequisitionFormBySlug
);

// [GET] /api/v1/productRequisitionForms/exportExcel/:slug
productRequisitionFormRoute.get(
  "/exportExcel/:slug",
  productRequisitionFormController.exportExcelProductRequisitionFormBySlug
);

// [GET] /api/v1/productRequisitionForms/completedApproval
productRequisitionFormRoute.get(
  "/completedApproval",
  productRequisitionFormController.getAllProductRequisitionFormsCompletedApproval
);

// [GET] /api/v1/productRequisitionForms
productRequisitionFormRoute.get(
  "/",
  authMiddleware.hasPermission(Action.READ, ProductRequisitionForm),
  productRequisitionFormController.getAllProductRequisitionForms
);

// [POST] /api/v1/productRequisitionForms
productRequisitionFormRoute.post(
  "/",
  authMiddleware.hasPermission(Action.CREATE, ProductRequisitionForm),
  productRequisitionFormController.createProductRequisitionForm
);

// [PATCH] /api/v1/productRequisitionForms/approval
productRequisitionFormRoute.patch(
  "/approval",
  productRequisitionFormController.approvalProductRequisitionForm
);

// [PATCH] /api/v1/productRequisitionForms/resubmit
productRequisitionFormRoute.patch(
  "/resubmit",
  authMiddleware.hasPermission(Action.UPDATE, ProductRequisitionForm),
  productRequisitionFormController.resubmitProductRequisitionForm
);

// [GET] /api/v1/productRequisitionForms/:slug
productRequisitionFormRoute.get(
  "/:slug",
  authMiddleware.hasPermission(Action.READ, ProductRequisitionForm),
  productRequisitionFormController.getProductRequisitionFormBySlug
);

// [PATCH] /api/v1/productRequisitionForms/:slug
productRequisitionFormRoute.patch(
  "/:slug",
  authMiddleware.hasPermission(Action.UPDATE, ProductRequisitionForm),
  productRequisitionFormController.updateGeneralInformationForm
);

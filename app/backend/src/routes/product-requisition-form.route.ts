import { Router } from "express";
import { productRequisitionFormController } from "@controllers";

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

// [GET] /api/v1/productRequisitionForms
productRequisitionFormRoute.get(
  "/",
  productRequisitionFormController.getAllProductRequisitionForms
);

// [POST] /api/v1/productRequisitionForms
productRequisitionFormRoute.post(
  "/",
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
  productRequisitionFormController.resubmitProductRequisitionForm
);

// [GET] /api/v1/productRequisitionForms/:slug
productRequisitionFormRoute.get(
  "/:slug",
  productRequisitionFormController.getProductRequisitionFormBySlug
);

// [PATCH] /api/v1/productRequisitionForms/:slug
productRequisitionFormRoute.patch(
  "/:slug",
  productRequisitionFormController.updateGeneralInformationForm
);

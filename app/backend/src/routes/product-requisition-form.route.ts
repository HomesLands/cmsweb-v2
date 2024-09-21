import { Router } from "express";
import { productRequisitionFormController } from "@controllers";

export const productRequisitionFormRoute: Router = Router();

// [GET] /api/v1/productRequisitionForms
productRequisitionFormRoute.route("/")
  .get(productRequisitionFormController.getAllProductRequisitionForms);

// [POST] /api/v1/productRequisitionForms
productRequisitionFormRoute.route("/")
  .post(productRequisitionFormController.createProductRequisitionForm);

// [GET] /api/v1/productRequisitionForms/approvalUser
productRequisitionFormRoute.route("/approvalUser")
.get(productRequisitionFormController.getAllProductRequisitionFormsByApprovalUser);

// [GET] /api/v1/productRequisitionForms/creator
productRequisitionFormRoute.route("/creator")
.get(productRequisitionFormController.getAllProductRequisitionFormsByCreator);

// [PATCH] /api/v1/productRequisitionForms/approvalForm
productRequisitionFormRoute.route("/approvalForm")
  .patch(productRequisitionFormController.approvalProductRequisitionForm);

// [GET] /api/v1/productRequisitionForms/:slug
productRequisitionFormRoute.route("/:slug")
  .get(productRequisitionFormController.getProductRequisitionFormBySlug);




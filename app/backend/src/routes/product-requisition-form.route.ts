import { Router } from "express";
import { productRequisitionFormController } from "@controllers";

export const productRequisitionFormRoute: Router = Router();

productRequisitionFormRoute.route("/")
  .get(productRequisitionFormController.getAllProductRequisitionForms);
productRequisitionFormRoute.route("/")
  .post(productRequisitionFormController.createProductRequisitionForm);
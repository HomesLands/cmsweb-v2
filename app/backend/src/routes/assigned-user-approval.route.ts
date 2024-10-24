import { Router } from "express";
import { assignedUserApprovalController } from "@controllers";

export const assignedUserApprovalRoute: Router = Router();

// [GET] /api/v1/assignedUserApprovals
assignedUserApprovalRoute
  .route("/")
  .get(assignedUserApprovalController.getAssignedUserApprovals);

// [POST] /api/v1/assignedUserApprovals
assignedUserApprovalRoute
  .route("/")
  .post(assignedUserApprovalController.createAssignedUserApproval);

// [PATCH] /api/v1/assignedUserApprovals
assignedUserApprovalRoute.patch(
  "/:slug",
  assignedUserApprovalController.updateAssignedUserApproval
);

// [DELETE] /api/v1/assignedUserApprovals
assignedUserApprovalRoute.delete(
  "/:slug",
  assignedUserApprovalController.deleteAssignedUserApproval
);

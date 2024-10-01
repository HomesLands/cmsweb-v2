import { Router } from "express";
import { assignedUserApprovalController } from "@controllers";

export const assignedUserApprovalRoute: Router = Router();

// [GET] /api/v1/assignedUserApprovals
assignedUserApprovalRoute.route("/")
  .get(assignedUserApprovalController.getAllAssignedUserApprovals)

// [POS] /api/v1/assignedUserApprovals
assignedUserApprovalRoute.route("/")
  .post(assignedUserApprovalController.createAssignedUserApproval);



import { userApprovalController } from "@controllers";
import { Router } from "express";

export const userApprovalRoute: Router = Router();

// [GET] /api/v1/userApprovals
userApprovalRoute.get("", userApprovalController.getUserApprovals);

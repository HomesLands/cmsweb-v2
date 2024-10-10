import { Router } from "express";
import { rolePermissionController } from "@controllers";

export const rolePermissionRoute: Router = Router();

// [POST] /api/v1/rolePermissions
rolePermissionRoute.post("/", rolePermissionController.createRolePermission);

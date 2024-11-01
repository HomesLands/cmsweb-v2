import { Router } from "express";
import { rolePermissionController } from "@controllers";

export const rolePermissionRoute: Router = Router();

// [POST] /api/v1/rolePermissions
rolePermissionRoute.post("/", rolePermissionController.createRolePermission);

// [GET] /api/v1/rolePermissions
rolePermissionRoute.get("/", rolePermissionController.getAllRolePermissions);

// [GET] /api/v1/rolePermissions/{slug}
rolePermissionRoute.get("/:slug", rolePermissionController.getRolePermission);

// [PUT] /api/v1/rolePermissions/{slug}
rolePermissionRoute.put(
  "/:slug",
  rolePermissionController.updateRolePermission
);

// [DELETE] /api/v1/rolePermissions/{slug}
rolePermissionRoute.delete(
  "/:slug",
  rolePermissionController.deleteRolePermission
);

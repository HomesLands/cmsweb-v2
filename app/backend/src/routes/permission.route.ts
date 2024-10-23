import { Router } from "express";
import { permissionController } from "@controllers";

export const permissionRoute: Router = Router();

// [GET] /api/v1/permissions
permissionRoute.route("/").get(permissionController.getAllPermissions);

// [POST] /api/v1/permissions
permissionRoute.route("/").post(permissionController.createPermission);

// [GET] /api/v1/permissions/{slug}
permissionRoute.route("/:slug").get(permissionController.getPermissionBySlug);

// [DELETE] /api/v1/departments/{slug}
permissionRoute.route("/:slug").delete(permissionController.deletePermission);

// [PATCH] /api/v1/departments/{slug}
permissionRoute.route("/:slug").patch(permissionController.updatePermission);

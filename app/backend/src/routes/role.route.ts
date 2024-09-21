import { roleController } from "@controllers";
import { Router } from "express";

export const roleRoute: Router = Router();

// [GET] /api/v1/roles
roleRoute.route("/").get(roleController.getAllRoles);

// [POST] /api/v1/roles
roleRoute.route("/").post(roleController.createRole);

// [GET] /api/v1/roles/{slug}
roleRoute.route("/:slug").get(roleController.getRoleBySlug);

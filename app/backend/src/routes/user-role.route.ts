import { Router } from "express";
import { userRoleController } from "@controllers";

export const userRoleRoute: Router = Router();

// [POST] /api/v1/userRoles
userRoleRoute.post("/", userRoleController.createUserRole);
userRoleRoute.delete("/:slug", userRoleController.deleteUserRole);

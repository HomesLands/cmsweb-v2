import { Router } from "express";
import { userDepartmentController } from "@controllers";

export const userDepartmentRoute: Router = Router();

// [GET] /api/v1/userDepartments
userDepartmentRoute.get("/", userDepartmentController.getAllUserDepartments);

// [POST] /api/v1/userDepartments
userDepartmentRoute.post("/", userDepartmentController.createUserDepartment);

// [PATCH] /api/v1/userDepartments
userDepartmentRoute.patch("/:slug", userDepartmentController.changeDepartment);

// [DELETE] /api/v1/userDepartments
userDepartmentRoute.delete(
  "/:slug",
  userDepartmentController.deleteUserDepartment
);

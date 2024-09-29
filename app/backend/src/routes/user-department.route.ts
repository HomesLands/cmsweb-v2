import { Router } from "express";
import { userDepartmentController } from "@controllers";

export const userDepartmentRoute: Router = Router();

// [GET] /api/v1/userDepartments
userDepartmentRoute.route("/")
  .get(userDepartmentController.getAllUserDepartments)

// [POS] /api/v1/userDepartments
userDepartmentRoute.route("/")
  .post(userDepartmentController.createUserDepartment);



import { Router } from "express";
import { departmentController } from "@controllers";

export const departmentRoute: Router = Router();

// [GET] /api/v1/departments
departmentRoute.route("/")
  .get(departmentController.getAllDepartments)

// [POS] /api/v1/departments
departmentRoute.route("/")
  .post(departmentController.createDepartment);



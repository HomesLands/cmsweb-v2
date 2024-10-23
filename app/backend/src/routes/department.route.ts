import { Router } from "express";
import { departmentController } from "@controllers";

export const departmentRoute: Router = Router();

// [GET] /api/v1/departments
departmentRoute.get("/", departmentController.getAllDepartments);

// [POS] /api/v1/departments
departmentRoute.post("/", departmentController.createDepartment);

// [DELETE] /api/v1/departments/{slug}
departmentRoute.route("/:slug").delete(departmentController.deleteDepartment);

// [PATCH] /api/v1/departments/{slug}
departmentRoute.route("/:slug").patch(departmentController.updateDepartment);

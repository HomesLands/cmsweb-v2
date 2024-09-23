import { Router } from "express";
import { projectController } from "@controllers";

export const projectRoute: Router = Router();

// [GET] /api/v1/projects
projectRoute.route("/")
  .get(projectController.getAllProjects)

// [POST] /api/v1/projects
projectRoute.route("/")
  .post(projectController.createProject);



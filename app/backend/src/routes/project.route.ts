import { Router } from "express";
import { projectController } from "@controllers";

export const projectRoute: Router = Router();

// [GET] /api/v1/projects
projectRoute.route("/")
  .get(projectController.getAllProjects)

// [POST] /api/v1/projects
projectRoute.route("/")
  .post(projectController.createProject);

// [GET] /api/v1/projects/:siteSlug
projectRoute.route("/:siteSlug")
  .get(projectController.getProjectsBySite)

// [PATCH] /api/v1/projects/:slug
projectRoute.route("/:slug")
  .patch(projectController.updateProject)



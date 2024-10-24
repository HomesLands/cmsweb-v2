import { Router } from "express";
import { projectController } from "@controllers";

export const projectRoute: Router = Router();

// [GET] /api/v1/projects
projectRoute.get("/", projectController.getAllProjects);

// [POST] /api/v1/projects
projectRoute.post("/", projectController.createProject);

// [PATCH] /api/v1/projects/{slug}
projectRoute.patch("/:slug", projectController.updateProject);

// [DELETE] /api/v1/projects/{slug}
projectRoute.delete("/:slug", projectController.deleteProject);

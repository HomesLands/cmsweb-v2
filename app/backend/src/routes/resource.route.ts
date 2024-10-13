import { Router } from "express";
import { resourceController } from "@controllers";

export const resourceRoute: Router = Router();

// [GET] /api/v1/resources
resourceRoute.route("/").get(resourceController.getAllResources);

// [POST] /api/v1/resources
resourceRoute.route("/").post(resourceController.createResource);

// [GET] /api/v1/resources/{slug}
resourceRoute.route("/:slug").get(resourceController.getResourceBySlug);

// [POST] /api/v1/resources/loadResources
resourceRoute.post("/loadResources", resourceController.loadResources);

// [PATCH] /api/v1/resources/{slug}
resourceRoute.route("/:slug").patch(resourceController.updateResource);

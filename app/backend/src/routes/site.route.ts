import { Router } from "express";
import { siteController } from "@controllers";

export const siteRoute: Router = Router();

// [GET] /api/v1/sites
siteRoute.get("/", siteController.getAllSites);

// [POST] /api/v1/sites
siteRoute.post("/", siteController.createSite);

// [PATCH] /api/v1/sites/{slug}
siteRoute.patch("/:slug", siteController.updateSite);

// [DELETE] /api/v1/sites/{slug}
siteRoute.delete("/:slug", siteController.deleteSite);

import { Router } from "express";
import { siteController } from "@controllers";

export const siteRoute: Router = Router();

// [GET] /api/v1/sites
siteRoute.route("/")
  .get(siteController.getAllSites)

// [POS] /api/v1/sites
siteRoute.route("/")
  .post(siteController.createSite);



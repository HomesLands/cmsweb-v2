import { Router } from "express";
import { siteController } from "@controllers";

export const siteRoute: Router = Router();

siteRoute.route("/")
  .get(siteController.getAllSites)
  .post(siteController.createSite);



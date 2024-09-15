import { Router } from "express";
import { siteController } from "@controllers";

export const siteRoute: Router = Router();

siteRoute.route("/").get(siteController.getAllSites);
siteRoute.route("/create").post(siteController.createSite);



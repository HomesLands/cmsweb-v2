import { Router } from "express";
import { companyController } from "@controllers";
export const companyRoute: Router = Router();

companyRoute.route("/").get(companyController.getAllCompanies);
companyRoute.route("/").post(companyController.createCompany);
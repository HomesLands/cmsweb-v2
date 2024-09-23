import { Router } from "express";
import { companyController } from "@controllers";
export const companyRoute: Router = Router();

// [GET] /api/v1/companies
companyRoute.route("/").get(companyController.getAllCompanies);

// [POST] /api/v1/companies
companyRoute.route("/").post(companyController.createCompany);
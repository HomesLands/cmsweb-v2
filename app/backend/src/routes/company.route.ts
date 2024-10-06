import { Router } from "express";
import { companyController } from "@controllers";
export const companyRoute: Router = Router();

// [POST] /api/v1/companies
// companyRoute.patch("/:slug", companyController.updateCompany);

// [GET] /api/v1/companies
companyRoute.get("/", companyController.getAllCompanies);

// [POST] /api/v1/companies
companyRoute.post("/", companyController.createCompany);

// [PATCH] /api/v1/companies/logo
companyRoute.route("/logo").patch(companyController.uploadCompanyLogo);

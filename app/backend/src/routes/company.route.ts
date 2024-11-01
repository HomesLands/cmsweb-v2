import { Router } from "express";
import { companyController } from "@controllers";
import { upload } from "@configs/multer.config";
export const companyRoute: Router = Router();

// [PATCH] /api/v1/companies
companyRoute.patch("/:slug", companyController.updateCompany);

// [GET] /api/v1/companies
companyRoute.get("/", companyController.getAllCompanies);

// [POST] /api/v1/companies
companyRoute.post("/", companyController.createCompany);

// [PATCH] /api/v1/companies/upload/:company
companyRoute.patch(
  "/upload/:company",
  upload.single("file"),
  companyController.uploadCompanyLogo
);

// [DELETE] /api/v1/companies/:company
companyRoute.delete("/:slug", companyController.deleteCompany);

import { Request, Response, NextFunction } from "express";

import { companyService } from "@services";
import {
  TApiResponse,
  TCreateCompanyRequestDto,
  TUploadCompanyLogoRequestDto,
  // TUpdateCompanyRequestDto,
} from "@types";
import { CompanyResponseDto } from "@dto/response";
import { StatusCodes } from "http-status-codes";

class CompanyController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateCompanyRequestDto:
   *       type: object
   *       required:
   *         - name
   *       properties:
   *         name:
   *           type: string
   *           description: company name
   *       example:
   *         name: Thái Bình
   */

  /**
   * @swagger
   * tags:
   *   - name: Company
   *     description: The company managing API
   */

  /**
   * @swagger
   * /companies:
   *   get:
   *     summary: Get all companies
   *     tags: [Company]
   *     responses:
   *       200:
   *         description: Get all companies successfully.
   *       500:
   *         description: Server error
   */

  public async getAllCompanies(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const companiesData = await companyService.getAllCompanies();

      const response: TApiResponse<CompanyResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list companies successfully",
        method: req.method,
        path: req.originalUrl,
        result: companiesData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /companies:
   *   post:
   *     summary: Create new company
   *     tags: [Company]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateCompanyRequestDto'
   *     responses:
   *       200:
   *         description: New company created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1040:
   *         description: Invalid company name
   *       1041:
   *         description: Company name exist
   *
   */

  public async createCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateCompanyRequestDto;
      const companyData = await companyService.createCompany(requestData);

      const response: TApiResponse<CompanyResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create company successfully",
        method: req.method,
        path: req.originalUrl,
        result: companyData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  // /**
  //  * @swagger
  //  * /companies/{slug}:
  //  *   patch:
  //  *     summary: Update company
  //  *     tags: [Company]
  //  *     parameters:
  //  *       - name: slug
  //  *         in: path
  //  *         required: true
  //  *         type: string
  //  *         description: Company slug
  //  *     requestBody:
  //  *       required: true
  //  *       content:
  //  *         application/json:
  //  *           schema:
  //  *              $ref: '#/components/schemas/UpdateCompanyRequestDto'
  //  *     responses:
  //  *       200:
  //  *         description: Company update successfully.
  //  *         content:
  //  *           application/json:
  //  *             schema:
  //  *       500:
  //  *         description: Server error
  //  *
  //  */

  // public async updateCompany(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const slug = req.params.slug as string;
  //     const requestData = req.body as TUpdateCompanyRequestDto;
  //     const companyData = await companyService.updateCompany(slug, requestData);

  //     const response: TApiResponse<CompanyResponseDto> = {
  //       code: StatusCodes.OK,
  //       error: false,
  //       message: "The company updated successfully",
  //       method: req.method,
  //       path: req.originalUrl,
  //       result: companyData,
  //     };
  //     res.status(StatusCodes.OK).json(response);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  /**
   * @swagger
   * /companies/upload:
   *   patch:
   *     summary: Upload company logo
   *     tags: [Company]
   *     parameters:
   *       - name: company
   *         in: path
   *         required: true
   *         type: string
   *         description: Company slug
   *     requestBody:
   *       require: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: The logo file to upload
   *     responses:
   *       200:
   *         description: Upload company logo successfully.
   *       500:
   *         description: Server error
   *       1098:
   *         description: File not found
   *       1106:
   *         description: Save file fail
   *       1107:
   *         description: Forbidden user
   *       1108:
   *         description: Error get file from request
   */
  public async uploadCompanyLogo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = {
        slug: req.params.company,
        file: req.file,
      } as TUploadCompanyLogoRequestDto;
      const result = await companyService.uploadCompanyLogo(requestData);
      const response: TApiResponse<CompanyResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `Upload company logo successfully`,
        method: req.method,
        path: req.originalUrl,
        result: result,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new CompanyController();

import { Request, Response, NextFunction } from "express";

import { companyService } from "@services";
import { TApiResponse, TCreateCompanyRequestDto } from "@types";
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
   *         description: New site created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *
   */

  public async createCompany(
    req: Request,
    res: Response,
    next: NextFunction,
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
}

export default new CompanyController();
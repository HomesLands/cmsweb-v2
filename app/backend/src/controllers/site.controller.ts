import { TApiResponse } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { siteService } from "@services";
import { SiteResponseDto } from "@dto/response";
import { TCreateSiteRequestDto } from "@types";

class SiteController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateSiteRequestDto:
   *       type: object
   *       required:
   *         - name
   *         - company
   *       properties:
   *         name:
   *           type: string
   *           description: sitename
   *         company:
   *           type: string
   *           description: companySlug
   *       example:
   *         name: FirstSite
   *         company: company-slug-123
   * 
   *     UpdateSiteRequestDto:
   *       type: object
   *       required:
   *         - name
   *         - company
   *       properties:
   *         name:
   *           type: string
   *           description: sitename
   *         company:
   *           type: string
   *           description: companySlug
   *       example:
   *         name: FirstSite
   *         company: company-slug-123
   */

  /**
   * @swagger
   * tags:
   *   - name: Site
   *     description: The site managing API
   */

  /**
   * @swagger
   * /sites:
   *   post:
   *     summary: Create new site
   *     tags: [Site]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSiteRequestDto'
   *     responses:
   *       201:
   *         description: New site created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1030:
   *         description: Invalid site name
   *       1043:
   *         description: Company not found
   *       1058:
   *         description: Invalid company slug
   *
   */

  public async createSite(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateSiteRequestDto;
      const siteData = await siteService.createSite(requestData);

      const response: TApiResponse<SiteResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create site successfully",
        method: req.method,
        path: req.originalUrl,
        result: siteData,
      };
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /sites/{slug}:
   *   patch:
   *     summary: Update site
   *     tags: [Site]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The site slug
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateSiteRequestDto'
   *     responses:
   *       201:
   *         description: Updated successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1030:
   *         description: Invalid site name
   *       1043:
   *         description: Company not found
   *       1051:
   *         description: Site not found
   *       1058:
   *         description: Invalid company slug
   *
   */

  public async updateSite(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const requestData = req.body as TCreateSiteRequestDto;
      const siteData = await siteService.updateSite(slug, requestData);

      const response: TApiResponse<SiteResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Update site successfully",
        method: req.method,
        path: req.originalUrl,
        result: siteData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /sites:
   *   get:
   *     summary: Get all sites
   *     tags: [Site]
   *     responses:
   *       200:
   *         description: Get all sites successfully.
   *       500:
   *         description: Server error
   */

  public async getAllSites(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sitesData = await siteService.getAllSites();

      const response: TApiResponse<SiteResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list sites successfully",
        method: req.method,
        path: req.originalUrl,
        result: sitesData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new SiteController();

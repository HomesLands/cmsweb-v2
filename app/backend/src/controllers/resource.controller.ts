import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { resourceService } from "@services";
import {
  TApiResponse,
  TCreateResourceRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
  TUpdateResourceRequestDto,
} from "@types";
import { ResourceResponseDto } from "@dto/response";

class ResourceController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateResourceRequestDto:
   *       type: object
   *       required:
   *         - name
   *       properties:
   *         name:
   *           type: string
   *           description: Resource name.
   *       example:
   *         name: user
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateResourceRequestDto:
   *       type: object
   *       required:
   *         - name
   *       properties:
   *         name:
   *           type: string
   *           description: Resource name.
   *       example:
   *         name: user
   *
   *     UpdateResourceRequestDto:
   *       type: object
   *       required:
   *         - name
   *       properties:
   *         name:
   *           type: string
   *           description: Resource name.
   *       example:
   *         name: user
   */

  /**
   * @swagger
   * tags:
   *   - name: Resource
   *     description: The permission managing API
   */

  /**
   * @swagger
   * /resources:
   *   get:
   *     summary: Get all resources
   *     tags: [Resource]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the resources are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of resources to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of resources to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: Resources have been retrieved successfully
   *       500:
   *         description: Server error
   */
  public async getAllResources(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plainData = req.query as unknown as TQueryRequest;
      const results = await resourceService.getAllResources(plainData);
      const response: TApiResponse<
        TPaginationOptionResponse<ResourceResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: "Resources have been retrieved successfully",
        method: req.method,
        path: req.originalUrl,
        result: results,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /resources/{slug}:
   *   get:
   *     summary: Get resource by slug
   *     tags: [Resource]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The resource slug
   *     responses:
   *       200:
   *         description: Get resource successfully
   *       500:
   *         description: Server error
   */
  public async getResourceBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const results = await resourceService.getResourceBySlug(slug);
      const response: TApiResponse<ResourceResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `Get resource with slug ${slug} successfully`,
        method: req.method,
        path: req.originalUrl,
        result: results,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /resources:
   *   post:
   *     summary: Create resource
   *     tags: [Resource]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateResourceRequestDto'
   *     responses:
   *       201:
   *         description: Create resource successfully.
   *       500:
   *         description: Server error
   *       1109:
   *         description: Resource name invalid
   */
  public async createResource(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateResourceRequestDto;

      const result: ResourceResponseDto =
        await resourceService.createResource(requestData);
      const response: TApiResponse<ResourceResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "The resource created successfully",
        method: req.method,
        path: req.originalUrl,
        result,
      };

      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /resources/{slug}:
   *   patch:
   *     summary: Update resource
   *     tags: [Resource]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The resource slug
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateResourceRequestDto'
   *     responses:
   *       201:
   *         description: Create resource successfully.
   *       500:
   *         description: Server error
   *       1110:
   *         description: Resource not found
   */
  public async updateResource(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const requestData = req.body as TUpdateResourceRequestDto;

      const result: ResourceResponseDto = await resourceService.updateResource(
        slug,
        requestData
      );
      const response: TApiResponse<ResourceResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "The resource updated successfully",
        method: req.method,
        path: req.originalUrl,
        result,
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /resources/loadResources:
   *   post:
   *     summary: Load all resource from entities folder
   *     tags: [Resource]
   *     responses:
   *       200:
   *         description: Get resource successfully
   *       500:
   *         description: Server error
   */
  public async loadResources(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const results = await resourceService.loadResources();
      const response: TApiResponse<ResourceResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: `All resource from entities has loaded successfully`,
        method: req.method,
        path: req.originalUrl,
        result: results,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new ResourceController();

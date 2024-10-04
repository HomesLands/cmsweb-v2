import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { permissionService } from "@services";
import {
  TApiResponse,
  TCreatePermissionRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
} from "@types";
import { PermissionResponseDto } from "@dto/response";

class PermissionController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreatePermissionRequestDto:
   *       type: object
   *       required:
   *         - roleSlug
   *         - authoritySlug
   *       properties:
   *         roleSlug:
   *           type: string
   *           description: Role code. Start with ROLE_
   *         authoritySlug:
   *           type: string
   *           description: Authority code
   *       example:
   *         roleSlug: V56Ck-iUuV
   *         authoritySlug: G4-uaU14OY
   */

  /**
   * @swagger
   * tags:
   *   - name: Permission
   *     description: The permission managing API
   */

  /**
   * @swagger
   * /permissions:
   *   get:
   *     summary: Get all permissions
   *     tags: [Permission]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the permissions are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of permissions to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of permissions to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: Permissions have been retrieved successfully
   *       500:
   *         description: Server error
   */
  public async getAllPermissions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plainData = req.query as unknown as TQueryRequest;
      const results = await permissionService.getAllPermissions(plainData);
      const response: TApiResponse<
        TPaginationOptionResponse<PermissionResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: "Permissions have been retrieved successfully",
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
   * /permissions/{slug}:
   *   get:
   *     summary: Get permission by slug
   *     tags: [Permission]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The permission identity
   *     responses:
   *       200:
   *         description: Get permission successfully
   *       500:
   *         description: Server error
   *       1072:
   *         description: Permission could not be found
   */
  public async getPermissionBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const results = await permissionService.getPermissionBySlug(slug);
      const response: TApiResponse<PermissionResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `Get permission with slug ${slug} successfully`,
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
   * /permissions:
   *   post:
   *     summary: Create permission
   *     tags: [Permission]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreatePermissionRequestDto'
   *     responses:
   *       200:
   *         description: Create role successfully.
   *       500:
   *         description: Server error
   *       1070:
   *         description: Role could not be found
   */
  public async createPermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreatePermissionRequestDto;

      const result: PermissionResponseDto =
        await permissionService.createPermission(requestData);
      const response: TApiResponse<PermissionResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "The permission created successfully",
        method: req.method,
        path: req.originalUrl,
        result,
      };

      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new PermissionController();

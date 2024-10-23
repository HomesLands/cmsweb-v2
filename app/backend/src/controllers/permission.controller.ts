import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { permissionService } from "@services";
import {
  TApiResponse,
  TCreatePermissionRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
  TUpdatePermissionRequestDto,
} from "@types";
import { PermissionResponseDto } from "@dto/response";
import { UpdatePermissionRequestDto } from "@dto/request";

class PermissionController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreatePermissionRequestDto:
   *       type: object
   *       required:
   *         - resourceSlug
   *         - authoritySlug
   *         - requiredOwner
   *       properties:
   *         resourceSlug:
   *           type: string
   *           description: Resource slug
   *         authoritySlug:
   *           type: string
   *           description: Authority code
   *         requiredOwner:
   *           type: boolean
   *           description: Required owner
   *       example:
   *         resourceSlug: V56Ck_iUuV
   *         authoritySlug: G4_uaU14OY
   *         requiredOwner: false
   *
   *     UpdatePermissionRequestDto:
   *       type: object
   *       required:
   *         - resourceSlug
   *         - authoritySlug
   *         - requiredOwner
   *       properties:
   *         resourceSlug:
   *           type: string
   *           description: Resource slug
   *         authoritySlug:
   *           type: string
   *           description: Authority code
   *         requiredOwner:
   *           type: boolean
   *           description: Required owner
   *       example:
   *         resourceSlug: V56Ck_iUuV
   *         authoritySlug: G4_uaU14OY
   *         requiredOwner: false
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

  /**
   * @swagger
   * /permissions/{slug}:
   *   patch:
   *     summary: Update permission
   *     tags: [Permission]
   *     parameters:
   *       - name: slug
   *         in: path
   *         required: true
   *         type: string
   *         description: Permission slug
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdatePermissionRequestDto'
   *     responses:
   *       200:
   *         description: Permission update successfully.
   *       500:
   *         description: Server error
   *       1070:
   *         description: Permission could not be found
   *
   */
  public async updatePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const requestData = req.body as TUpdatePermissionRequestDto;
      Object.assign(requestData, { slug });

      const result = await permissionService.updatePermission(requestData);
      const response: TApiResponse<UpdatePermissionRequestDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "The permission updated successfully",
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
   * /permissions/{slug}:
   *   delete:
   *     summary: Delete permission
   *     tags: [Permission]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of permission
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Permission deleted successfully.
   *       500:
   *         description: Server error
   *       1070:
   *         description: Permission not found
   *
   */
  public async deletePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result = await permissionService.deletePermission(slug);
      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: `Permission has been deleted successfully`,
        method: req.method,
        path: req.originalUrl,
        result: `${result} rows effected`,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new PermissionController();

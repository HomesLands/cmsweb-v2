import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { rolePermissionService } from "@services";
import {
  TApiResponse,
  TCreateRolePermissionRequestDto,
  TUpdateRolePermissionRequestDto,
} from "@types";
import { RolePermissionResponseDto } from "@dto/response";

class RolePermissionController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateRolePermissionRequestDto:
   *       type: object
   *       required:
   *         - roleSlug
   *         - permissionSlug
   *       properties:
   *         roleSlug:
   *           type: string
   *           description: Role slug
   *         permissionSlug:
   *           type: string
   *           description: Permission slug
   *       example:
   *         roleSlug: V56Ck_iUuV
   *         permissionSlug: G4_uaU14OY
   *
   *     UpdateRolePermissionRequestDto:
   *       type: object
   *       required:
   *         - roleSlug
   *         - permissionSlug
   *       properties:
   *         roleSlug:
   *           type: string
   *           description: Role slug
   *         permissionSlug:
   *           type: string
   *           description: Permission slug
   *       example:
   *         roleSlug: V56Ck_iUuV
   *         permissionSlug: G4_uaU14OY
   */

  /**
   * @swagger
   * tags:
   *   - name: RolePermission
   *     description: The role permission managing API
   */

  /**
   * @swagger
   * /rolePermissions:
   *   post:
   *     summary: Create role permission
   *     tags: [RolePermission]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateRolePermissionRequestDto'
   *     responses:
   *       201:
   *         description: Role permission created successfully.
   *       500:
   *         description: Server error
   *       1070:
   *         description: Role could not be found
   */
  public async createRolePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateRolePermissionRequestDto;

      const result: RolePermissionResponseDto =
        await rolePermissionService.createRolePermission(requestData);
      const response: TApiResponse<RolePermissionResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "The user role created successfully",
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
   * /rolePermissions/{slug}:
   *   get:
   *     summary: Get role permission
   *     tags: [RolePermission]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of role permission
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Role permission retrieved successfully.
   *       500:
   *         description: Server error
   *       1130:
   *         description: Role permission could not be found
   */
  public async getRolePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;

      const result: RolePermissionResponseDto =
        await rolePermissionService.getRolePermission(slug);
      const response: TApiResponse<RolePermissionResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "The role permission retrieved successfully",
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
   * /rolePermissions:
   *   get:
   *     summary: Get all role permissions
   *     tags: [RolePermission]
   *     responses:
   *       200:
   *         description: Role permission retrieved successfully.
   *       500:
   *         description: Server error
   *       1130:
   *         description: Role permission could not be found
   */
  public async getAllRolePermissions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: RolePermissionResponseDto[] =
        await rolePermissionService.getAllRolePermissions();
      const response: TApiResponse<RolePermissionResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "The role permissions retrieved successfully",
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
   * /rolePermissions/{slug}:
   *   delete:
   *     summary: Delete role permission
   *     tags: [RolePermission]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of role permission
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Role permission deleted successfully.
   *       500:
   *         description: Server error
   *       1130:
   *         description: Role permission could not be found
   */
  public async deleteRolePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;

      const result = await rolePermissionService.deleteRolePermission(slug);
      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: "The role permission deleted successfully",
        method: req.method,
        path: req.originalUrl,
        result: `${result} rows affected`,
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /rolePermissions/{slug}:
   *   put:
   *     summary: Update role permission
   *     tags: [RolePermission]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of role permission
   *         example: slug-123
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateRolePermissionRequestDto'
   *     responses:
   *       200:
   *         description: Role permission updated successfully.
   *       500:
   *         description: Server error
   *       1130:
   *         description: Role permission could not be found
   *       1132:
   *         description: Role permission exist
   */
  public async updateRolePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const requestData = req.body as TUpdateRolePermissionRequestDto;
      Object.assign(requestData, { slug });

      const result =
        await rolePermissionService.updateRolePermission(requestData);
      const response: TApiResponse<RolePermissionResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "The role permission updated successfully",
        method: req.method,
        path: req.originalUrl,
        result,
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new RolePermissionController();

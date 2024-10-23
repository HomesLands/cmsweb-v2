import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { roleService } from "@services";
import {
  TApiResponse,
  TCreateRoleRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
  TUpdateRoleRequestDto,
} from "@types";
import { RoleResponseDto } from "@dto/response";
import { logger } from "@lib/logger";

class RoleController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateRoleRequestDto:
   *       type: object
   *       required:
   *         - nameNormalize
   *         - nameDisplay
   *         - description
   *         - nameDisplay
   *       properties:
   *         nameNormalize:
   *           type: string
   *           description: Role code. Start with ROLE_
   *         nameDisplay:
   *           type: string
   *           description: Name display for role name
   *         description:
   *           type: string
   *           description: Description for role name
   *       example:
   *         nameNormalize: ROLE_DIRECTOR
   *         nameDisplay: Giám đốc
   *         description: Được phép tạo người dùng
   *
   *     UpdateRoleRequestDto:
   *       type: object
   *       required:
   *         - nameNormalize
   *         - description
   *         - nameDisplay
   *       properties:
   *         nameNormalize:
   *           type: string
   *           description: Role code. Start with ROLE_
   *         description:
   *           type: string
   *           description: Description for role name
   *         nameDisplay:
   *           type: string
   *           description: Display name for role name
   *       example:
   *         nameNormalize: ROLE_DIRECTOR
   *         nameDisplay: Giám đốc
   *         description: Cho phép duyệt yêu cầu vật tư
   */

  /**
   * @swagger
   * tags:
   *   - name: Role
   *     description: The role managing API
   */

  /**
   * @swagger
   * /roles:
   *   get:
   *     summary: Get all roles
   *     tags: [Role]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the roles are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of roles to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of roles to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: Roles have been retrieved successfully.
   *       500:
   *         description: Server error
   */
  public async getAllRoles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plainData = req.query as unknown as TQueryRequest;
      const results = await roleService.getAllRoles(plainData);

      const response: TApiResponse<
        TPaginationOptionResponse<RoleResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: "Roles have been retrieved successfully",
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
   * /roles/{slug}:
   *   get:
   *     summary: Get role by slug
   *     tags: [Role]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The user identity
   *     responses:
   *       200:
   *         description: Get all users successfully.
   *       500:
   *         description: Server error
   */
  public async getRoleBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const results = await roleService.getRoleBySlug(slug);
      const response: TApiResponse<RoleResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `Get role with slug ${slug} successfully`,
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
   * /roles:
   *   post:
   *     summary: Create role
   *     tags: [Role]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateRoleRequestDto'
   *     responses:
   *       200:
   *         description: Create role successfully.
   *       500:
   *         description: Server error
   *       1087:
   *         description: Role must start with "ROLE_"
   */
  public async createRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateRoleRequestDto;
      logger.info(`[${RoleController.name}]`, requestData);

      const result: RoleResponseDto = await roleService.createRole(requestData);
      const response: TApiResponse<RoleResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "The role created successfully",
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
   * /roles/{slug}:
   *   patch:
   *     summary: Update role
   *     tags: [Role]
   *     parameters:
   *       - name: slug
   *         in: path
   *         required: true
   *         type: string
   *         description: Role slug
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateRoleRequestDto'
   *     responses:
   *       200:
   *         description: Role update successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1070:
   *         description: Role could not be found
   *       1087:
   *         description: Role must start with "ROLE_"
   *
   */
  public async updateRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const requestData = req.body as TUpdateRoleRequestDto;

      const result: RoleResponseDto = await roleService.updateRole(
        slug,
        requestData
      );
      const response: TApiResponse<RoleResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "The role updated successfully",
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
   * /roles/{slug}:
   *   delete:
   *     summary: Delete role
   *     tags: [Role]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of role
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Role deleted successfully.
   *       500:
   *         description: Server error
   *       1070:
   *         description: Role not found
   *
   */
  public async deleteRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result = await roleService.deleteRole(slug);
      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: `Role has been deleted successfully`,
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

export default new RoleController();

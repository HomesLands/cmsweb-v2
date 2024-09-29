import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { roleService } from "@services";
import { TApiResponse, TCreateRoleRequestDto } from "@types";
import { RoleResponseDto, UserResponseDto } from "@dto/response";
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
   *         - description
   *       properties:
   *         nameNormalize:
   *           type: string
   *           description: Role code. Start with ROLE_
   *         description:
   *           type: string
   *           description: Description for role name
   *       example:
   *         nameNormalize: ROLE_DIRECTOR
   *         description: Giám đốc
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
   *     responses:
   *       200:
   *         description: Get all roles successfully.
   *       500:
   *         description: Server error
   */
  public async getAllRoles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const results = await roleService.getAllRoles();
      const response: TApiResponse<RoleResponseDto[]> = {
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
   */
  public async createRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateRoleRequestDto;
      logger.info("", { filename: RoleController.name, requestData });

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
}

export default new RoleController();

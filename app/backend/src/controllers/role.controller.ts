import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { roleService, userService } from "@services";
import { TApiResponse, TQueryRequest } from "@types";
import { UserResponseDto } from "@dto/response";
import { logger } from "@lib";

class RoleController {
  /**
   * @swagger
   * tags:
   *   - name: Role
   *     description: The role managing API
   */

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all roles
   *     tags: [roles]
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
      const plainData = req.query as unknown as TQueryRequest;
      const results = await roleService.getAllRoles(plainData);
      const response: TApiResponse<UserResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get all users successfully",
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
   * /users/{slug}:
   *   get:
   *     summary: Get user by slug
   *     tags: [User]
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
  public async getUserBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const results = await userService.getUserBySlug(slug);
      const response: TApiResponse<UserResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `Get user with slug ${slug} successfully`,
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

export default new RoleController();

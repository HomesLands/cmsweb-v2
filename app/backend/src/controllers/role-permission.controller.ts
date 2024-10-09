import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { rolePermissionService } from "@services";
import { TApiResponse, TCreateRolePermissionRequestDto } from "@types";
import { UserRoleResponseDto } from "@dto/response";

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
   *         userSlug: G4_uaU14OY
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

      const result: UserRoleResponseDto =
        await rolePermissionService.createRolePermission(requestData);
      const response: TApiResponse<UserRoleResponseDto> = {
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
}

export default new RolePermissionController();

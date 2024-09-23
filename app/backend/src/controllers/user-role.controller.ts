import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { userRoleService } from "@services";
import { TApiResponse, TCreateUserRoleRequestDto } from "@types";
import { UserRoleResponseDto } from "@dto/response";

class UserRoleController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateUserRoleRequestDto:
   *       type: object
   *       required:
   *         - roleSlug
   *         - userSlug
   *       properties:
   *         roleSlug:
   *           type: string
   *           description: Role code. Start with ROLE_
   *         userSlug:
   *           type: string
   *           description: User code
   *       example:
   *         roleSlug: V56Ck-iUuV
   *         userSlug: G4-uaU14OY
   */

  /**
   * @swagger
   * tags:
   *   - name: UserRole
   *     description: The user role managing API
   */

  /**
   * @swagger
   * /userRoles:
   *   post:
   *     summary: Create user role
   *     tags: [UserRole]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserRoleRequestDto'
   *     responses:
   *       200:
   *         description: Create user role successfully.
   *       500:
   *         description: Server error
   */
  public async createUserRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateUserRoleRequestDto;

      const result: UserRoleResponseDto =
        await userRoleService.createUserRole(requestData);
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

export default new UserRoleController();

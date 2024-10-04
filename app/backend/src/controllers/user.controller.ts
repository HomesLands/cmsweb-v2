import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { userService } from "@services";
import { TApiResponse, TQueryRequest } from "@types";
import { UserPermissionResponseDto, UserResponseDto } from "@dto/response";

class UserController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     UpdateUserRoleRequestDto:
   *       type: array
   *       description: List of role slug being requested.
   *       items:
   *         type: string
   *         example: ""
   */

  /**
   * @swagger
   * tags:
   *   - name: User
   *     description: The user managing API
   */

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     tags: [User]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the users are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of users to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of users to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: Get all users successfully.
   *       500:
   *         description: Server error
   */
  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plainData = req.query as unknown as TQueryRequest;
      const results = await userService.getAllUsers(plainData);
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
   * /users/info:
   *   get:
   *     summary: Get user info
   *     tags: [User]
   *     responses:
   *       200:
   *         description: The user has been retrieved successfully.
   *       500:
   *         description: Server error
   *       1004:
   *         description: User not found
   */
  public async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId = "" } = req;
      const results = await userService.getUser(userId);
      const response: TApiResponse<UserResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `The user has been retrieved successfully`,
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
   * /users/info/permissions:
   *   get:
   *     summary: Get user permissions
   *     tags: [User]
   *     responses:
   *       200:
   *         description: User permissions have been retrieved successfully.
   *       500:
   *         description: Server error
   */
  public async getUserPermissions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId = "" } = req;
      const results: UserPermissionResponseDto[] =
        await userService.getUserPermissions(userId);
      const response: TApiResponse<UserPermissionResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: `User permissions have been retrieved successfully`,
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

export default new UserController();

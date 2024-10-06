import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { userService } from "@services";
import { TApiResponse, TPaginationOptionResponse, TQueryRequest } from "@types";
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
      const response: TApiResponse<
        TPaginationOptionResponse<UserResponseDto[]>
      > = {
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

  /**
   * @swagger
   * /users/signature:
   *   patch:
   *     summary: Upload user signature
   *     tags: [User]
   *     requestBody:
   *       require: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: The signature file to upload
   *     responses:
   *       200:
   *         description: Upload user signature successfully.
   *       500:
   *         description: Server error
   *       1098:
   *         description: File not found
   *       1106:
   *         description: Save file fail
   *       1107:
   *         description: Forbidden user
   *       1108:
   *         description: Error get file from request
   */
  public async uploadUserSignature(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await userService.uploadUserSignature(req, res);
      const response: TApiResponse<UserResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `Upload signature user successfully`,
        method: req.method,
        path: req.originalUrl,
        result: result,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /users/avatar:
   *   patch:
   *     summary: Upload avatar user
   *     tags: [User]
   *     requestBody:
   *       require: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: The avatar file to upload
   *     responses:
   *       200:
   *         description: Upload avatar user successfully.
   *       500:
   *         description: Server error
   *       1098:
   *         description: File not found
   *       1106:
   *         description: Save file fail
   *       1107:
   *         description: Forbidden user
   *       1108:
   *         description: Error get file from request
   */
  public async uploadUserAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await userService.uploadUserAvatar(req, res);
      const response: TApiResponse<UserResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `Upload avatar user successfully`,
        method: req.method,
        path: req.originalUrl,
        result: result,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

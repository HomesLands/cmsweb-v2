import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { userService } from "@services";
import {
  TApiResponse,
  TChangePasswordRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
  TUpdateUser,
  TUploadUserAvatarRequestDto,
  TUploadUserSignRequestDto,
} from "@types";
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
   *
   *     ChangePasswordRequestDto:
   *       type: object
   *       required:
   *         - currentPassword
   *         - newPassword
   *         - confirmPassword
   *       properties:
   *         currentPassword:
   *           type: string
   *           description: Current password
   *         newPassword:
   *           type: string
   *           description: New password
   *         confirmPassword:
   *           type: string
   *           description: Confirm password
   *       example:
   *         currentPassword: Pass@1234
   *         newPassword: NewPass@1234
   *         confirmPassword: NewPass@1234
   * 
   *     UpdateUserRequestDto:
   *       type: object
   *       required:
   *         - fullname
   *         - dob
   *         - gender
   *         - address
   *         - phoneNumber
   *         - email
   *       properties:
   *         fullname:
   *           type: string
   *           description: user fullname
   *         dob:
   *           type: string
   *           description: user dob
   *         gender:
   *           type: string
   *           description: user gender
   *         address:
   *           type: string
   *           description: user address
   *         phoneNumber:
   *           type: string
   *           description: user phone number
   *         email:
   *           type: string
   *           description: user email
   *       example:
   *         fullname: Nguyễn Văn A
   *         dob: 1999-10-12
   *         gender: male
   *         address: Linh Trung, Thủ Đức
   *         phoneNumber: "0900321456"
   *         email: "nguyenvana@gmail.com"
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
      const results = await userService.getUser(userId, req.ability);
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
   * /users/upload/sign:
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
      const requestData = {
        userId: req.userId,
        file: req.file,
      } as TUploadUserSignRequestDto;
      const result = await userService.uploadUserSignature(requestData);
      const response: TApiResponse<UserResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `Upload signature user successfully`,
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
   * /users/upload/avatar:
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
      const requestData = {
        userId: req.userId,
        file: req.file,
      } as TUploadUserAvatarRequestDto;

      const result = await userService.uploadUserAvatar(requestData);
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

  /**
   * @swagger
   * /users/changePassword:
   *   patch:
   *     summary: Change password
   *     tags: [User]
   *     requestBody:
   *       require: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/ChangePasswordRequestDto'
   *     responses:
   *       200:
   *         description: User password has updated successfully
   *       500:
   *         description: Server error
   *       1008:
   *         description: Password is not valid
   *       1113:
   *         description: New password invalid
   *       1114:
   *         description: Confirm password invalid
   *       1115:
   *         description: Password does not match
   *       1116:
   *         description: Confirm password does not match
   */
  public async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId = "" } = req;
      const requestData = req.body as TChangePasswordRequestDto;
      const result = await userService.changePassword(userId, requestData);
      const response: TApiResponse<UserResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `User password has updated successfully`,
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
   * /users:
   *   patch:
   *     summary: Update user
   *     tags: [User]
   *     requestBody:
   *       require: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateUserRequestDto'
   *     responses:
   *       200:
   *         description: User updated successfully
   *       500:
   *         description: Server error
   *       1011:
   *         description: Fullname is not valid
   *       1039:
   *         description: Invalid date format
   *       1129:
   *         description: Invalid user gender
   *       1130:
   *         description: Invalid user address
   *       1131:
   *         description: Invalid user phone number
   *       1132:
   *         description: Invalid user email
   */
  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId = "" } = req;
      const requestData = req.body as TUpdateUser;
      const result = await userService.updateUser(userId, requestData);
      const response: TApiResponse<UserResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `User update successfully`,
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

export default new UserController();

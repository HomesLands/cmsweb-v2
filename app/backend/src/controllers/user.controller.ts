import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { userService } from "@services";
import {
  TApiResponse,
  TChangePasswordRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
  TUpdateUserInfoRequestDto,
  TUpdateUsernameRequestDto,
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
   *     UpdateUserInfoRequestDto:
   *       type: object
   *       required:
   *         - dob
   *         - gender
   *         - address
   *         - phoneNumber
   *         - fullname
   *       properties:
   *         dob:
   *           type: string
   *           description: dob
   *         gender:
   *           type: string
   *           description: gender
   *         phoneNumber:
   *           type: string
   *           description: Phone number
   *         fullname:
   *           type: string
   *           description: fullname
   *       example:
   *         dob: 01/01/1999
   *         gender: male
   *         address: 01 Linh Trung, TP Thủ Đức
   *         phoneNumber: "0987654321"
   *         fullname: John Doe
   *
   *     UpdateUsernameRequestDto:
   *       type: object
   *       required:
   *         - username
   *       properties:
   *         username:
   *           type: string
   *           description: username
   *       example:
   *         username: username
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
   * /users/info:
   *   patch:
   *     summary: Update user info
   *     tags: [User]
   *     requestBody:
   *       require: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateUserInfoRequestDto'
   *     responses:
   *       200:
   *         description: User info has updated successfully
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
  public async updateUserInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId = "" } = req;
      const requestData = req.body as TUpdateUserInfoRequestDto;
      Object.assign(requestData, { userId });

      const result = await userService.updateUserInfo(requestData);
      const response: TApiResponse<UserResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `User info has updated successfully`,
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
   * /users/{slug}/username:
   *   patch:
   *     summary: Update username
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of user
   *         example: slug-123
   *     requestBody:
   *       require: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateUsernameRequestDto'
   *     responses:
   *       200:
   *         description: Username has updated successfully
   *       500:
   *         description: Server error
   *       1003:
   *         description: Username is not valid
   */
  public async updateUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const requestData = req.body as TUpdateUsernameRequestDto;
      Object.assign(requestData, { userSlug: slug });

      const result = await userService.updateUsername(requestData);
      const response: TApiResponse<UserResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `Username has updated successfully`,
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
   * /users/{slug}:
   *   delete:
   *     summary: Delete user
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of user
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Username has updated successfully
   *       500:
   *         description: Server error
   *       1004:
   *         description: User not found
   */
  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result = await userService.deleteUser(slug);
      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: "The user deleted successfully",
        method: req.method,
        path: req.originalUrl,
        result: `${result} rows affected`,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

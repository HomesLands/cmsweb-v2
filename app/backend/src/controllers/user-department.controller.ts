import { TApiResponse, TUpdateUserDepartmentRequestDto } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userDepartmentService } from "@services";
import { UserDepartmentResponseDto } from "@dto/response";
import { TCreateUserDepartmentRequestDto } from "@types";

class UserDepartmentController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateUserDepartmentRequestDto:
   *       type: object
   *       required:
   *         - user
   *         - department
   *       properties:
   *         user:
   *           type: string
   *           description: user slug
   *         department:
   *           type: string
   *           description: department slug
   *       example:
   *         user: user-slug-123
   *         department: department-slug-123
   *
   *     UpdateUserDepartmentRequestDto:
   *       type: object
   *       required:
   *         - department
   *       properties:
   *         department:
   *           type: string
   *           description: department slug
   *       example:
   *         department: department-slug-123
   */

  /**
   * @swagger
   * tags:
   *   - name: UserDepartment
   *     description: The user department managing API
   */

  /**
   * @swagger
   * /userDepartments:
   *   post:
   *     summary: Create new user department
   *     tags: [UserDepartment]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserDepartmentRequestDto'
   *     responses:
   *       201:
   *         description: New user department created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1004:
   *         description: User not found
   *       1080:
   *         description: Invalid user slug
   *       1081:
   *         description: Invalid department slug
   *       1082:
   *         description: Department not found
   *
   */

  public async createUserDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateUserDepartmentRequestDto;
      const userDepartmentData =
        await userDepartmentService.createUserDepartment(requestData);

      const response: TApiResponse<UserDepartmentResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create userDepartment successfully",
        method: req.method,
        path: req.originalUrl,
        result: userDepartmentData,
      };
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /userDepartments:
   *   get:
   *     summary: Get all user department
   *     tags: [UserDepartment]
   *     responses:
   *       200:
   *         description: Get all user department successfully.
   *       500:
   *         description: Server error
   */

  public async getAllUserDepartments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userDepartmentsData =
        await userDepartmentService.getAllUserDepartments();

      const response: TApiResponse<UserDepartmentResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "User departments have been retrieved successfully",
        method: req.method,
        path: req.originalUrl,
        result: userDepartmentsData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /userDepartments/{slug}:
   *   patch:
   *     summary: Change department
   *     tags: [UserDepartment]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of user department
   *         example: slug-123
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateUserDepartmentRequestDto'
   *     responses:
   *       200:
   *         description: Change department successfully
   *       500:
   *         description: Server error
   *       1081:
   *         description: Invalid department slug
   *       1121:
   *         description: User department slug invalid
   *       1117:
   *         description: User department exists
   *       1082:
   *         description: Department not found
   *
   */

  public async changeDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { slug } = req.params;
      const requestData = req.body as TUpdateUserDepartmentRequestDto;
      Object.assign(requestData, { slug });

      const result = await userDepartmentService.changeDepartment(requestData);
      const response: TApiResponse<UserDepartmentResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "User department has been updated",
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
   * /userDepartments/{slug}:
   *   delete:
   *     summary: Delete user department
   *     tags: [UserDepartment]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of user department
   *         example: slug-123
   *     responses:
   *       200:
   *         description: delete user department successfully
   *
   */

  public async deleteUserDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { slug } = req.params;
      console.log(req.params);
      const result = await userDepartmentService.deleteUserDepartment(slug);

      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: "User department has been deleted",
        method: req.method,
        path: req.originalUrl,
        result: `${result} affected rows`,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserDepartmentController();

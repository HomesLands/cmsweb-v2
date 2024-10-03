import { TApiResponse } from "@types";
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
   */

  /**
   * @swagger
   * tags:
   *   - name: UserDepartment
   *     description: The userDepartment managing API
   */

  /**
   * @swagger
   * /userDepartments:
   *   post:
   *     summary: Create new userDepartment
   *     tags: [UserDepartment]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserDepartmentRequestDto'
   *     responses:
   *       201:
   *         description: New userDepartment created successfully.
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
      const userDepartmentData = await userDepartmentService.createUserDepartment(requestData);

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
   *     summary: Get all userDepartments
   *     tags: [UserDepartment]
   *     responses:
   *       200:
   *         description: Get all userDepartments successfully.
   *       500:
   *         description: Server error
   */

  public async getAllUserDepartments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userDepartmentsData = await userDepartmentService.getAllUserDepartments();

      const response: TApiResponse<UserDepartmentResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list userDepartments successfully",
        method: req.method,
        path: req.originalUrl,
        result: userDepartmentsData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserDepartmentController();

import { TApiResponse } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { departmentService } from "@services";
import { DepartmentResponseDto } from "@dto/response";
import { TCreateDepartmentRequestDto } from "@types";

class DepartmentController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateDepartmentRequestDto:
   *       type: object
   *       required:
   *         - nameNormalize
   *         - description
   *         - site
   *       properties:
   *         nameNormalize:
   *           type: string
   *           description: nameNormalize
   *         description:
   *           type: string
   *           description: description for nameNormalize
   *         site:
   *           type: string
   *           description: siteSlug
   *       example:
   *         nameNormalize: PROJECT_DEPARTMENT
   *         description: Phòng dự án
   *         site: site-slug-123
   */

  /**
   * @swagger
   * tags:
   *   - name: Department
   *     description: The department managing API
   */

  /**
   * @swagger
   * /departments:
   *   post:
   *     summary: Create new department
   *     tags: [Department]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateDepartmentRequestDto'
   *     responses:
   *       201:
   *         description: New department created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1051:
   *         description: Site not found
   *
   */

  public async createDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateDepartmentRequestDto;
      const departmentData = await departmentService.createDepartment(requestData);

      const response: TApiResponse<DepartmentResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create department successfully",
        method: req.method,
        path: req.originalUrl,
        result: departmentData,
      };
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /departments:
   *   get:
   *     summary: Get all departments
   *     tags: [Department]
   *     responses:
   *       200:
   *         description: Get all departments successfully.
   *       500:
   *         description: Server error
   */

  public async getAllDepartments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const departmentsData = await departmentService.getAllDepartments();

      const response: TApiResponse<DepartmentResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list departments successfully",
        method: req.method,
        path: req.originalUrl,
        result: departmentsData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new DepartmentController();

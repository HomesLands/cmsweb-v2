import { TApiResponse, TUpdateDepartmentRequestDto } from "@types";
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
   *         nameNormalize: PROJECT
   *         description: Phòng dự án
   *         site: site-slug-123
   *
   *     UpdateDepartmentRequestDto:
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
   *       1059:
   *         description: Invalid site slug
   *       1086:
   *         description: Invalid description department
   *       1099:
   *         description: Name normalize department must end with "_DEPARTMENT"
   *
   */

  public async createDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateDepartmentRequestDto;
      const departmentData =
        await departmentService.createDepartment(requestData);

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

  /**
   * @swagger
   * /departments/{slug}:
   *   delete:
   *     summary: Delete department
   *     tags: [Department]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of department
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Department deleted successfully.
   *       500:
   *         description: Server error
   *       1070:
   *         description: Department not found
   *
   */
  public async deleteDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result = await departmentService.deleteDepartment(slug);
      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: `Department has been deleted successfully`,
        method: req.method,
        path: req.originalUrl,
        result: `${result} rows effected`,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /departments/{slug}:
   *   patch:
   *     summary: Update department
   *     tags: [Department]
   *     parameters:
   *       - name: slug
   *         in: path
   *         required: true
   *         type: string
   *         description: Department slug
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateDepartmentRequestDto'
   *     responses:
   *       200:
   *         description: Department update successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1070:
   *         description: Department could not be found
   *       1087:
   *         description: Department must start with "_DEPARTMENT"
   *
   */
  public async updateDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const requestData = req.body as TUpdateDepartmentRequestDto;
      Object.assign(requestData, { slug });

      const result = await departmentService.updateDepartment(requestData);
      const response: TApiResponse<DepartmentResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "The department updated successfully",
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

export default new DepartmentController();

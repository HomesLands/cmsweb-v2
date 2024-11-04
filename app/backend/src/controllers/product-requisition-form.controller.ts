import {
  TApiResponse,
  TPaginationOptionResponse,
  TQueryRequest,
  TResubmitProductRequisitionFormRequestDto,
  TUpdateGeneralInformationProductRequisitionFormRequestDto,
} from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { productRequisitionFormService } from "@services";
import { ProductRequisitionFormResponseDto } from "@dto/response";
import {
  TCreateProductRequisitionFormRequestDto,
  TApprovalProductRequisitionFormRequestDto,
} from "@types";
import { logger } from "@lib";

class ProductRequisitionFormController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateRequestProductDto:
   *       type: object
   *       required:
   *         - product
   *         - requestQuantity
   *         - name
   *         - provider
   *         - unit
   *         - description
   *       properties:
   *         product:
   *           type: string
   *           description: The slug of the product.
   *         requestQuantity:
   *           type: integer
   *           description: The quantity of the product being requested.
   *         name:
   *           type: string
   *           description: The name of the product being requested.
   *         provider:
   *           type: string
   *           description: The provider of the product being requested.
   *         unit:
   *           type: string
   *           description: The unit slug of the product being requested.
   *         description:
   *           type: string
   *           description: The description of the request product.
   *       example:
   *         product: KeYdkmeNg
   *         requestQuantity: 10
   *         name: Máy cắt bê tông
   *         provider: BOSCH
   *         unit: unit-slug-123
   *         description: Loại nhỏ
   *
   *     CreateProductRequisitionFormRequestDto:
   *       type: object
   *       required:
   *         - code
   *         - projectName
   *         - type
   *         - deadlineApproval
   *         - description
   *         - requestProducts
   *         - departmentSlug
   *       properties:
   *         code:
   *           type: string
   *           description: The code for the requisition form.
   *         projectName:
   *           type: string
   *           description: The name of the project.
   *         type:
   *           type: string
   *           description: The type of form.
   *         deadlineApproval:
   *           type: string
   *           description: The date expire approval form.
   *         description:
   *           type: string
   *           description: The opinion of creator.
   *         departmentSlug:
   *           type: string
   *           description: The slug of department
   *         requestProducts:
   *           type: array
   *           description: List of products being requested.
   *           items:
   *             $ref: '#/components/schemas/CreateRequestProductDto'
   *       example:
   *         code: YCVT123
   *         projectName: project-789
   *         deadlineApproval: 2024-09-12 20:45:15
   *         type: urgent
   *         description: Ý kiến người tạo
   *         departmentSlug: bcOJsOG72
   *         requestProducts:
   *           - product: KeYdkmeNg
   *             requestQuantity: 10
   *             name: Máy cắt bê tông
   *             provider: BOSCH
   *             unit: unit-slug-123
   *             description: Loại nhỏ
   *
   *     CreateApprovalLogRequestDto:
   *       type: object
   *       required:
   *         - status
   *         - content
   *       properties:
   *         status:
   *           type: string
   *           description: The slug of approval user (accept/give_back/cancel)
   *         content:
   *           type: string
   *           description: The content of approval user
   *       example:
   *         status: accept
   *         content: yêu cầu ổn
   *
   *
   *     ApprovalProductRequisitionFormRequestDto:
   *       type: object
   *       required:
   *         - formSlug
   *         - approvalLog
   *       properties:
   *         formSlug:
   *           type: string
   *           description: The slug of the form.
   *         approvalLog:
   *           type: object
   *           description: Object approval log.
   *           items:
   *             $ref: '#/components/schemas/CreateApprovalLogRequestDto'
   *       example:
   *         formSlug: XUWyA6fr7i
   *         approvalLog:
   *             status: accept
   *             content: Yêu cầu ổn
   *
   *     ResubmitProductRequisitionFormRequestDto:
   *       type: object
   *       required:
   *         - slug
   *         - description
   *       properties:
   *         slug:
   *           type: string
   *           description: The slug of the form.
   *         description:
   *           type: string
   *           description: The reason resubmit form.
   *       example:
   *         slug: XUWyA6fr7i
   *         description: Đã chỉnh sửa
   *
   *     UpdateGeneralInformationProductRequisitionFormRequestDto:
   *       type: object
   *       required:
   *         - projectName
   *         - type
   *         - deadlineApproval
   *         - description
   *       properties:
   *         projectName:
   *           type: string
   *           description: Project name
   *         type:
   *           type: string
   *           description: Type of product requisition form, it can be normal or urgent
   *         deadlineApproval:
   *           type: string
   *           description: Deadline approval for product requisition form
   *         description:
   *           type: string
   *           description: Description for product requisition form
   *       example:
   *         projectName: project-123
   *         type: normal
   *         deadlineApproval: 2024-09-15 10:25:45
   *         description: Đã chỉnh sửa
   *
   */

  /**
   * @swagger
   * tags:
   *   - name: ProductRequisitionForm
   *     description: The product requisition form managing API
   */

  /**
   * @swagger
   * /productRequisitionForms:
   *   get:
   *     summary: Get all product requisition forms by creator
   *     tags: [ProductRequisitionForm]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the product requisition forms are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of product requisition forms to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of product requisition forms to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: Get all the product requisition forms successfully.
   *       500:
   *         description: Server error
   */

  public async getAllProductRequisitionForms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = req.query as unknown as TQueryRequest;
      const creatorId = req.userId as string;
      logger.info(`[${ProductRequisitionFormController.name}]`, query);
      const results =
        await productRequisitionFormService.getAllProductRequisitionForms(
          creatorId,
          query
        );

      const response: TApiResponse<
        TPaginationOptionResponse<ProductRequisitionFormResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: "Product requisition forms have been retrieved successfully",
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
   * /productRequisitionForms/completedApproval:
   *   get:
   *     summary: Get completed approval product requisition forms
   *     tags: [ProductRequisitionForm]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the product requisition forms are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of product requisition forms to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of product requisition forms to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: Get completed approval product requisition forms successfully.
   *       500:
   *         description: Server error
   */

  public async getAllProductRequisitionFormsCompletedApproval(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = req.query as unknown as TQueryRequest;
      logger.info(`[${ProductRequisitionFormController.name}]`, query);
      const results =
        await productRequisitionFormService.getAllProductRequisitionFormsCompletedApproval(
          query
        );

      const response: TApiResponse<
        TPaginationOptionResponse<ProductRequisitionFormResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message:
          "Get list completed approval product requisition forms successfully",
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
   * /productRequisitionForms:
   *   post:
   *     summary: Create new product requisition form
   *     tags: [ProductRequisitionForm]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateProductRequisitionFormRequestDto'
   *     responses:
   *       200:
   *         description: New product requisition form created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1026:
   *         description: Invalid product provider
   *       1027:
   *         description: Invalid product name
   *       1039:
   *         description: Invalid date format
   *       1042:
   *         description: Product requisition form code exist
   *       1044:
   *         description: Invalid quantity user approval
   *       1052:
   *         description: Project not found
   *       1053:
   *         description: Invalid creator
   *       1056:
   *         description: Invalid form code
   *       1057:
   *         description: Invalid type of product requisition form
   *       1060:
   *         description: Invalid project slug
   *       1061:
   *         description: Invalid request product array
   *       1066:
   *         description: Invalid request product quantity
   *       1069:
   *         description: Missing user approval
   *       1084:
   *         description: Invalid deadline date approval form
   *       1088:
   *         description: Invalid unit slug
   *       1097:
   *         description: Invalid product description
   *
   */
  public async createProductRequisitionForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateProductRequisitionFormRequestDto;
      const creatorId = req.userId as string;
      Object.assign(requestData, { creatorId });

      const form =
        await productRequisitionFormService.createProductRequisitionForm(
          requestData
        );

      const response: TApiResponse<ProductRequisitionFormResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "New product requisition form created successfully",
        method: req.method,
        path: req.originalUrl,
        result: form,
      };
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /productRequisitionForms/{slug}:
   *   get:
   *     summary: get product requisition form by slug
   *     tags: [ProductRequisitionForm]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: slug
   *         in: path
   *         required: true
   *         type: string
   *         description: slug of product requisition form
   *     responses:
   *       200:
   *         description: get product requisition form successfully.
   *       500:
   *         description: Server error
   *       1046:
   *         description: Form not found
   *
   */

  public async getProductRequisitionFormBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const form =
        await productRequisitionFormService.getProductRequisitionFormBySlug(
          slug
        );

      const response: TApiResponse<ProductRequisitionFormResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get productRequisitionForm successfully",
        method: req.method,
        path: req.originalUrl,
        result: form,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /productRequisitionForms/approval:
   *   patch:
   *     summary: update status for product requisition form by approval user
   *     tags: [ProductRequisitionForm]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/ApprovalProductRequisitionFormRequestDto'
   *     responses:
   *       200:
   *         description: update status for product requisition form successfully.
   *       500:
   *         description: Server error
   *       1046:
   *         description: Form not found
   *       1050:
   *         description: Product requisition form done approval
   *       1085:
   *         description: Forbidden approval form
   *
   */

  public async approvalProductRequisitionForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.userId as string;
      const data = req.body as TApprovalProductRequisitionFormRequestDto;
      const form =
        await productRequisitionFormService.approvalProductRequisitionForm(
          data,
          userId
        );

      const response: TApiResponse<ProductRequisitionFormResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Approval productRequisitionForms successfully",
        method: req.method,
        path: req.originalUrl,
        result: form,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /productRequisitionForms/resubmit:
   *   patch:
   *     summary: Re-submit product requisition form by creator
   *     tags: [ProductRequisitionForm]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/ResubmitProductRequisitionFormRequestDto'
   *     responses:
   *       200:
   *         description: resubmit product requisition form successfully.
   *       500:
   *         description: Server error
   *       1046:
   *         description: Form not found
   *       1063:
   *         description: Invalid form slug
   *       1072:
   *         description: Forbidden edit form
   *       1077:
   *         description: Invalid reason resubmit form
   *
   */

  public async resubmitProductRequisitionForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body as TResubmitProductRequisitionFormRequestDto;
      logger.info("ResubmitProductRequisitionFormRequest", { data });

      const result =
        await productRequisitionFormService.resubmitProductRequisitionForm(
          data,
          req.ability
        );

      const response: TApiResponse<ProductRequisitionFormResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Product requisition form has been submitted successfully",
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
   * /productRequisitionForms/{slug}:
   *   patch:
   *     summary: Update general information of product requisition form
   *     tags: [ProductRequisitionForm]
   *     parameters:
   *       - name: slug
   *         in: path
   *         required: true
   *         type: string
   *         description: Form slug
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateGeneralInformationProductRequisitionFormRequestDto'
   *     responses:
   *       200:
   *         description: Product requisition form update successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1039:
   *         description: Invalid date format
   *       1046:
   *         description: Form not found
   *       1052:
   *         description: Project not found
   *       1057:
   *         description: Invalid type of product requisition form
   *       1060:
   *         description: Invalid project slug
   *       1084:
   *         description: Invalid deadline date approval form
   *
   */
  public async updateGeneralInformationForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data =
        req.body as TUpdateGeneralInformationProductRequisitionFormRequestDto;
      const slug = req.params.slug;
      const ability = req.ability;

      const result =
        await productRequisitionFormService.updateGeneralInformationForm(
          slug,
          data,
          ability
        );

      const response: TApiResponse<ProductRequisitionFormResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Product requisition form has been updated successfully",
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
   * /productRequisitionForms/{slug}/exportExcel:
   *   get:
   *     summary: Export productRequisitionForm to excel by slug
   *     tags: [ProductRequisitionForm]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: slug
   *         in: path
   *         required: true
   *         type: string
   *         description: slug of product requisition form
   *     responses:
   *       200:
   *         description: Export excel product requisition form successfully.
   *       500:
   *         description: Server error
   *       1046:
   *         description: Form not found
   *
   */

  public async exportExcel(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const requestUrl = `${req.protocol}://${req.get("host")}`;
      const { filename, buffer } =
        await productRequisitionFormService.exportExcel({
          formSlug: slug,
          requestUrl,
        });

      res.writeHead(200, {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=${filename}`,
      });

      // End the response after the file is sent
      res.end(buffer);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /productRequisitionForms/{slug}/exportPdf:
   *   get:
   *     summary: Export productRequisitionForm to pdf by slug
   *     tags: [ProductRequisitionForm]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: slug
   *         in: path
   *         required: true
   *         type: string
   *         description: slug of product requisition form
   *     responses:
   *       200:
   *         description: Export pdf product requisition form successfully.
   *       500:
   *         description: Server error
   *       1046:
   *         description: Form not found
   *
   */

  public async exportPdf(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestUrl = `${req.protocol}://${req.get("host")}`;
      const slug = req.params.slug as string;
      const { filename, buffer } =
        await productRequisitionFormService.exportPdf({
          slug,
          requestUrl,
        });

      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${filename}`,
      });

      // End the response after the file is sent
      res.end(buffer);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /productRequisitionForms/{slug}:
   *   delete:
   *     summary: Delete product requisition form
   *     tags: [ProductRequisitionForm]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of form
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Product requisition form has been deleted successfully
   *       500:
   *         description: Server error
   *       1046:
   *         description: Form not found
   */
  public async deleteProductRequisitionForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result = await productRequisitionFormService.deleteProductRequisitionForm(slug);
      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: "The form deleted successfully",
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

export default new ProductRequisitionFormController();

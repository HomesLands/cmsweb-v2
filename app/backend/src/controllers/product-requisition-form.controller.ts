import {
  TApiResponse,
  TPaginationOptionResponse,
  TQueryRequest,
  TResubmitProductRequisitionFormRequestDto,
} from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { productRequisitionFormService } from "@services";
import {
  ProductRequisitionFormResponseDto,
  UserApprovalFormResponseDto,
} from "@dto/response";
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
   *         - productSlug
   *         - requestQuantity
   *       properties:
   *         productSlug:
   *           type: string
   *           description: The slug of the product.
   *         requestQuantity:
   *           type: integer
   *           description: The quantity of the product being requested.
   *       example:
   *         productSlug: KeYdkmeNg
   *         requestQuantity: 10
   *
   *     CreateUserApprovalDto:
   *       type: object
   *       required:
   *         - userSlug
   *         - roleApproval
   *       properties:
   *         userSlug:
   *           type: string
   *           description: The slug of the user who is approving.
   *         roleApproval:
   *           type: string
   *           description: The approval stage (approval_stage_1, approval_stage_2, approval_stage_3).
   *       example:
   *         userSlug: KeYdkmeNg
   *         roleApproval: approval_stage_1
   *
   *     CreateProductRequisitionFormRequestDto:
   *       type: object
   *       required:
   *         - code
   *         - companySlug
   *         - siteSlug
   *         - projectSlug
   *         - type
   *         - requestProducts
   *         - userApprovals
   *         - description
   *       properties:
   *         code:
   *           type: string
   *           description: The code for the requisition form.
   *         companySlug:
   *           type: string
   *           description: The slug of the company.
   *         siteSlug:
   *           type: string
   *           description: The slug of the site.
   *         projectSlug:
   *           type: string
   *           description: The slug of the project.
   *         type:
   *           type: string
   *           description: The type of form.
   *         description:
   *           type: string
   *           description: The opinion of creator.
   *         requestProducts:
   *           type: array
   *           description: List of products being requested.
   *           items:
   *             $ref: '#/components/schemas/CreateRequestProductDto'
   *         userApprovals:
   *           type: array
   *           description: List of user approvals for the form.
   *           items:
   *             $ref: '#/components/schemas/CreateUserApprovalDto'
   *       example:
   *         code: YCVT123
   *         companySlug: company-789
   *         siteSlug: site-789
   *         projectSlug: project-789
   *         type: urgent
   *         description: Ý kiến người tạo
   *         requestProducts:
   *           - productSlug: KeYdkmeNg
   *             requestQuantity: 10
   *         userApprovals:
   *           - userSlug: user-456
   *             roleApproval: approval_stage_3
   *
   *     ApprovalProductRequisitionFormRequestDto:
   *       type: object
   *       required:
   *         - formSlug
   *         - approvalUserSlug
   *         - approvalLogStatus
   *         - approvalLogContent
   *       properties:
   *         formSlug:
   *           type: string
   *           description: The slug of the form.
   *         approvalUserSlug:
   *           type: string
   *           description: The slug of approval user for form.
   *         approvalLogStatus:
   *           type: string
   *           description: The status approval form (accept/give_back/cancel)
   *         approvalLogContent:
   *           type: string
   *           description: The reason approval form.
   *       example:
   *         formSlug: XUWyA6fr7i
   *         approvalUserSlug: rIsvuLZgnE_
   *         approvalLogStatus: accept
   *         approvalLogContent: Yêu cầu đã ok
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
   */

  /**
   * @swagger
   * tags:
   *   - name: ProductRequisitionForm
   *     description: The productRequisitionForm managing API
   */

  /**
   * @swagger
   * /productRequisitionForms:
   *   get:
   *     summary: Get all product requisition forms
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
      logger.info("", query);
      const results =
        await productRequisitionFormService.getAllProductRequisitionForms(
          query
        );

      const response: TApiResponse<
        TPaginationOptionResponse<ProductRequisitionFormResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list productRequisitionForms successfully",
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
      const form =
        await productRequisitionFormService.createProductRequisitionForm(
          creatorId,
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
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /productRequisitionForms/{slug}:
   *   get:
   *     summary: get productRequisitionForm by slug
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
   * /productRequisitionForms/approvalUser:
   *   get:
   *     summary: get productRequisitionForm by approvalUser
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
   *         description: get product requisition form successfully.
   *       500:
   *         description: Server error
   *
   */

  public async getAllProductRequisitionFormsByApprovalUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.userId as string;
      const query = req.query as unknown as TQueryRequest;
      const form =
        await productRequisitionFormService.getAllProductRequisitionFormsByApprovalUser(
          userId,
          query
        );

      const response: TApiResponse<
        TPaginationOptionResponse<UserApprovalFormResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list productRequisitionForms successfully",
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
   * /productRequisitionForms/approvalForm:
   *   patch:
   *     summary: update status for productRequisitionForm by approvalUser
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
   *
   */

  public async approvalProductRequisitionForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body as TApprovalProductRequisitionFormRequestDto;
      const form =
        await productRequisitionFormService.approvalProductRequisitionForm(
          data
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
   * /productRequisitionForms/creator:
   *   get:
   *     summary: get productRequisitionForm by creator
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
   *         description: get product requisition form successfully.
   *       500:
   *         description: Server error
   *
   */

  public async getAllProductRequisitionFormsByCreator(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const creatorId = req.userId as string;
      const query = req.query as unknown as TQueryRequest;
      const forms =
        await productRequisitionFormService.getAllProductRequisitionFormsByCreator(
          creatorId,
          query
        );

      const response: TApiResponse<
        TPaginationOptionResponse<ProductRequisitionFormResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list productRequisitionForms successfully",
        method: req.method,
        path: req.originalUrl,
        result: forms,
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
   *     summary: resubmit productRequisitionForm by creator
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
   *
   */

  public async resubmitRequisitionFormsByCreator(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body as TResubmitProductRequisitionFormRequestDto;
      logger.info("ResubmitProductRequisitionFormRequest", { data });

      const result =
        await productRequisitionFormService.resubmitRequisitionFormsByCreator(
          data
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
}

export default new ProductRequisitionFormController();

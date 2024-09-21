import { TApiResponse, TPaginationOptionResponse, TQueryRequest } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { productRequisitionFormService } from "@services";
import { ProductRequisitionFormResponseDto } from "@dto/response";
import { TCreateProductRequisitionFormRequestDto } from "@types";
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
   *         - type
   *         - requestProducts
   *         - userApprovals
   *       properties:
   *         code:
   *           type: string
   *           description: The code for the requisition form.
   *         companySlug:
   *           type: string
   *           description: The slug of the company.
   *         type:
   *           type: string
   *           description: The type of form.
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
   *         code: YCVT20092024-GFSW6
   *         companySlug: KeYdkmeNg
   *         type: normal
   *         requestProducts:
   *           - productSlug: KeYdkmeNg
   *             requestQuantity: 10
   *         userApprovals:
   *           - userSlug: KeYdkmeNg
   *             roleApproval: approval_stage_1
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
}

export default new ProductRequisitionFormController();

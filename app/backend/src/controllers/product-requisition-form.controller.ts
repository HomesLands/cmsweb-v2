import { TApiResponse } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { productRequisitionFormService } from "@services";
import { ProductRequisitionFormResponseDto } from "@dto/response";
import { TCreateProductRequisitionFormRequestDto } from "@types";

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
   *         productSlug: product-123
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
   *         userSlug: user-456
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
   *         code: YCVT123
   *         companySlug: company-789
   *         type: normal
   *         requestProducts:
   *           - productSlug: product-123
   *             requestQuantity: 10
   *         userApprovals:
   *           - userSlug: user-456
   *             roleApproval: approval_stage_1
   * /
  
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
   *     summary: Get all productRequisitionForms
   *     tags: [ProductRequisitionForm]
   *     responses:
   *       200:
   *         description: Get all productRequisitionForms successfully.
   *       500:
   *         description: Server error
   */

  public async getAllProductRequisitionForms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const formsData = 
        await productRequisitionFormService.getAllProductRequisitionForms({
          order: "DESC",
          skip: 0,
          take: 100,
        });

      const response: TApiResponse<ProductRequisitionFormResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list productRequisitionForms successfully",
        method: req.method,
        path: req.originalUrl,
        result: formsData,
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
   *     summary: Create new productRequisitionForm
   *     tags: [ProductRequisitionForm]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateProductRequisitionFormRequestDto'
   *     responses:
   *       200:
   *         description: New site created successfully.
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
    next: NextFunction,
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateProductRequisitionFormRequestDto;
      const form = await productRequisitionFormService.createProductRequisitionForm(requestData);

      const response: TApiResponse<ProductRequisitionFormResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create site successfully",
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
    next: NextFunction,
  ): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const form = await productRequisitionFormService.getProductRequisitionFormBySlug(slug);

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
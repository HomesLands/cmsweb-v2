import { Request, Response, NextFunction } from "express";
import {
  TApiResponse,
 TCreateProductPurchaseFormRequestDto,
 TPaginationOptionResponse,
 TQueryRequest
} from "@types";
import {
  ProductPurchaseFormResponseDto
} from "@dto/response";
import { productPurchaseFormService } from "@services";
import { StatusCodes } from "http-status-codes";
import { logger } from "@lib";
class ProductPurchaseFormController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreatePurchaseProductRequestDto:
   *       type: object
   *       required:
   *         - purchaseQuantity
   *         - name
   *         - provider
   *         - unit
   *         - description
   *       properties:
   *         purchaseQuantity:
   *           type: number
   *           description: The quantity of the purchase product.
   *         product:
   *           type: string
   *           description: The slug of the product.
   *         temporaryProduct:
   *           type: string
   *           description: The slug of the temporary product.
   *         name:
   *           type: string
   *           description: The name of the product.
   *         provider:
   *           type: string
   *           description: The provider of the product.
   *         unit:
   *           type: string
   *           description: The slug of the unit for product.
   *         description:
   *           type: string
   *           description: The description of product.
   *       example:
   *         purchaseQuantity: 10
   *         product: product-slug-123
   *         temporaryProduct: temporary-product-slug-123
   *         name: máy khoan
   *         provider: BOSCH
   *         unit: unit-slug-123
   *         description: Loại nhỏ
   *
   *     CreateProductPurchaseFormRequestDto:
   *       type: object
   *       required:
   *         - code
   *         - description
   *         - purchaseProducts
   *       properties:
   *         code:
   *           type: string
   *           description: The code for the product purchase form.
   *         description:
   *           type: string
   *           description: The description of the form.
   *         productRequisitionForm:
   *           type: string
   *           description: The slug of the product requisition form which is created purchase form.
   *         purchaseProducts:
   *           type: array
   *           description: List of products being requested.
   *           items:
   *             $ref: '#/components/schemas/CreatePurchaseProductRequestDto'
   *       example:
   *         code: YCMH123
   *         description: Lưu ý mua sớm danh sách này
   *         productRequisitionForm: form-slug-123
   *         purchaseProducts:
   *           - purchaseQuantity: 10
   *             product: product-slug-123
   *             temporaryProduct: temporary-product-slug-123
   *             name: Máy cắt bê tông
   *             provider: BOSCH
   *             unit: unit-slug-123
   *             description: Loại nhỏ
   * 
   */

  /**
   * @swagger
   * tags:
   *   - name: ProductPurchaseForm
   *     description: The product purchase form managing API
   */
  
  /**
   * @swagger
   * /productPurchaseForms:
   *   post:
   *     summary: Create product purchase form
   *     tags: [ProductPurchaseForm]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateProductPurchaseFormRequestDto'
   *     responses:
   *       200:
   *         description: Create product purchase form successfully.
   *       500:
   *         description: Server error.
   *       1024:
   *         description: Unit not found when create not exist product.
   *       1026:
   *         description: Invalid product provider.
   *       1027:
   *         description: Invalid product name.
   *       1056:
   *         description: Invalid form code.
   *       1088:
   *         description: Invalid unit slug.
   *       1097:
   *         description: Invalid product description.
   *       1113:
   *         description: Invalid purchase product quantity.
   *       1114:
   *         description: Invalid purchase product array.
   *       1115:
   *         description: Invalid status form.
   */

  public async createProductPurchaseForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateProductPurchaseFormRequestDto;
      const result = await productPurchaseFormService.createProductPurchaseForm(requestData);
      const response: TApiResponse<ProductPurchaseFormResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create product purchase form successfully",
        method: req.method,
        path: req.originalUrl,
        result: result,
      };
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /productPurchaseForms:
   *   get:
   *     summary: Get all product purchase forms
   *     tags: [ProductPurchaseForm]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the product purchase forms are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of product purchase forms to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of product purchase forms to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: Get all the product purchase forms successfully.
   *       500:
   *         description: Server error
   */

  public async getAllProductPurchaseForms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = req.query as unknown as TQueryRequest;
      logger.info(`[${ProductPurchaseFormController.name}]`, query);
      const results =
        await productPurchaseFormService.getAllProductPurchaseForms(
          query
        );

      const response: TApiResponse<
        TPaginationOptionResponse<ProductPurchaseFormResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list product purchase forms successfully",
        method: req.method,
        path: req.originalUrl,
        result: results,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

}
export default new ProductPurchaseFormController();
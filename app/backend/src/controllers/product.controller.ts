import { Request, Response, NextFunction } from "express";
import { productService } from "@services";
import {
  TApiResponse,
  TCreateProductRequestDto,
  TPaginationOptionRequest,
} from "@types";
import { ProductResponseDto } from "@dto/response";
import { StatusCodes } from "http-status-codes";
import { logger } from "@lib";

class ProductController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateProductRequestDto:
   *       type: object
   *       required:
   *         - name
   *         - provider
   *         - unit
   *       properties:
   *         name:
   *           type: string
   *           description: productName
   *         code:
   *           type: string
   *           description: productCode - barcode
   *         provider:
   *           type: string
   *           description: productProvider
   *         unit:
   *           type: string
   *           description: unitSlugForProduct
   *         description:
   *           type: string
   *           description: descriptionProduct
   *       oneOf:
   *         - required: ["code"]
   *         - required: ["description"]
   *       example:
   *         name: Tủ lạnh 1 cửa
   *         code: 8886008101053
   *         provider: Aqua
   *         unit: M_aSwDaaau
   *         description: description
   */

  /**
   * @swagger
   * tags:
   *   - name: Product
   *     description: The product managing API
   */

  /**
   * @swagger
   * /products:
   *   get:
   *     summary: Get all products
   *     tags: [Product]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the products are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: skip
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of products to skip
   *         example: 0
   *       - in: query
   *         name: take
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of products to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: Get all products successfully.
   *       500:
   *         description: Server error
   */

  public async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = req.query as unknown as TPaginationOptionRequest;
      logger.info(ProductController.name, query);
      const results = await productService.getAllProducts(query);
      const response: TApiResponse<ProductResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Products have been retrieved successfully",
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
   * /products:
   *   post:
   *     summary: Create new product
   *     tags: [Product]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateProductRequestDto'
   *     responses:
   *       200:
   *         description: New product created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *
   */

  public async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateProductRequestDto;
      const productData = await productService.createProduct(requestData);

      const response: TApiResponse<ProductResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create product successfully",
        method: req.method,
        path: req.originalUrl,
        result: productData,
      };
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();

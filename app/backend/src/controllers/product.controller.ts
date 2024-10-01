import { Request, Response, NextFunction } from "express";
import { productService } from "@services";
import {
  TApiResponse,
  TCreateProductRequestDto,
  TUpdateProductRequestDto,
  TPaginationOptionResponse,
  TProductQueryRequest,
} from "@types";
import { ProductResponseDto } from "@dto/response";
import { StatusCodes } from "http-status-codes";
import { logger } from "@lib";

class ProductController {
  private _name = ProductController.name;
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
   *         unit:
   *           type: string
   *           description: unit slug for product
   *         provider:
   *           type: string
   *           description: productProvider
   *         description:
   *           type: string
   *           description: descriptionProduct
   *       oneOf:
   *         - required: ["code"]
   *         - required: ["description"]
   *       example:
   *         name: Máy khoan động lực điện Bosch GSB 10 RE 500W
   *         code: 8886008101053
   *         provider: BOSCH
   *         unit: slug-1234
   *         description: Dùng điện, Có chổi than
   * 
   *     UpdateProductRequestDto:
   *       type: object
   *       required:
   *         - slug
   *       properties:
   *         slug:
   *           type: string
   *           description: The slug of product
   *         name:
   *           type: string
   *           description: The name of product
   *         unit:
   *           type: string
   *           description: The unit slug for product
   *         code:
   *           type: string
   *           description: productCode - barcode
   *         provider:
   *           type: string
   *           description: productProvider
   *         description:
   *           type: string
   *           description: descriptionProduct
   *       oneOf:
   *         - required: ["code"]
   *         - required: ["description"]
   *       example:
   *         slug: slug-123 
   *         name: Máy khoan động lực điện Bosch GSB 10 RE 500W
   *         code: 8886008101053
   *         provider: BOSCH
   *         unit: slug-1234
   *         description: Dùng điện, Có chổi than
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
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of products to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of products to retrieve
   *         example: 10
   *       - in: query
   *         name: searchTerm
   *         schema:
   *           type: string
   *         required: false
   *         description: Search by product name
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
      const query = req.query as unknown as TProductQueryRequest;
      logger.info("", query);
      const results = await productService.getAllProducts(query);
      const response: TApiResponse<
        TPaginationOptionResponse<ProductResponseDto[]>
      > = {
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

  /**
   * @swagger
   * /products:
   *   patch:
   *     summary: Update product
   *     tags: [Product]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateProductRequestDto'
   *     responses:
   *       200:
   *         description: Update product successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *
   */

  public async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TUpdateProductRequestDto;
      const productData = await productService.updateProduct(requestData);

      const response: TApiResponse<ProductResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Update product successfully",
        method: req.method,
        path: req.originalUrl,
        result: productData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
  
}

export default new ProductController();

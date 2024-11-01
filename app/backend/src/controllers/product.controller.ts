import { Request, Response, NextFunction } from "express";
import { productService } from "@services";
import {
  TApiResponse,
  TCreateProductRequestDto,
  TUpdateProductRequestDto,
  TPaginationOptionResponse,
  TProductQueryRequest,
  TUploadProductRequestDto,
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
   *       1024:
   *         description: Unit not found
   *       1025:
   *         description: Code product exist
   *       1026:
   *         description: Invalid product provider
   *       1027:
   *         description: Invalid product name
   *       1029:
   *         description: Invalid product code
   *       1088:
   *         description: Invalid unit slug
   *       1097:
   *         description: Invalid product description
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
   *       1024:
   *         description: Unit not found
   *       1025:
   *         description: Code product exist
   *       1026:
   *         description: Invalid product provider
   *       1027:
   *         description: Invalid product name
   *       1029:
   *         description: Invalid product code
   *       1045:
   *         description: Product not found
   *       1065:
   *         description: Invalid product slug
   *       1088:
   *         description: Invalid unit slug
   *       1097:
   *         description: Invalid product description
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

  /**
   * @swagger
   * /products/upload:
   *   post:
   *     summary: Import products
   *     tags: [Product]
   *     requestBody:
   *       require: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: Excel file
   *     responses:
   *       200:
   *         description: Upload avatar user successfully.
   *       500:
   *         description: Server error
   *       1098:
   *         description: File not found
   *       1106:
   *         description: Save file fail
   *       1107:
   *         description: Forbidden user
   *       1108:
   *         description: Error get file from request
   */
  public async uploadProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = {
        file: req.file,
      } as TUploadProductRequestDto;
      const result = await productService.uploadProduct(requestData);
      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: "Import product successfully",
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
   * /products/{slug}:
   *   delete:
   *     summary: Delete product
   *     tags: [Product]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of product
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Product updated successfully.
   *       500:
   *         description: Server error
   *       1051:
   *         description: Product not found
   *
   */
  public async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result = await productService.deleteProduct(slug);

      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: "product has been deleted successfully",
        method: req.method,
        path: req.originalUrl,
        result: `${result} rows effected`,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();

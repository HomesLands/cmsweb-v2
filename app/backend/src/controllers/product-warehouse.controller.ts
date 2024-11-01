import { TApiResponse } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { productWarehouseService } from "@services";
import { ProductWarehouseResponseDto } from "@dto/response";
import { TCreateProductWarehouseRequestDto } from "@types";

class ProductWarehouseController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateProductWarehouseRequestDto:
   *       type: object
   *       required:
   *         - quantity
   *         - warehouse
   *         - product
   *       properties:
   *         quantity:
   *           type: integer
   *           description: The quantity of product in any warehouse
   *         warehouse:
   *           type: string
   *           description: warehouse slug
   *         product:
   *           type: string
   *           description: product slug
   *       example:
   *         quantity: 10
   *         warehouse: warehouse-slug-123
   *         product: product-slug-123
   */

  /**
   * @swagger
   * tags:
   *   - name: ProductWarehouse
   *     description: The productWarehouse managing API
   */

  /**
   * @swagger
   * /productWarehouses:
   *   post:
   *     summary: Create new productWarehouse
   *     tags: [ProductWarehouse]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateProductWarehouseRequestDto'
   *     responses:
   *       201:
   *         description: New productWarehouse created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1090:
   *         description: Warehouse not found
   *       1045:
   *         description: Product not found
   *       1065:
   *         description: Invalid product slug
   *       1089:
   *         description: Invalid quantity product warehouse
   *       1091:
   *         description: Missing quantity product warehouse add new
   *       1092:
   *         description: Error when update product quantity
   *       1100:
   *         description: Invalid warehouse slug
   *       1128:
   *         description: Product existed in this warehouse
   *
   */

  public async createProductWarehouse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateProductWarehouseRequestDto;
      const siteData = await productWarehouseService.createProductWarehouse(requestData);

      const response: TApiResponse<ProductWarehouseResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create productWarehouse successfully",
        method: req.method,
        path: req.originalUrl,
        result: siteData,
      };
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /productWarehouses:
   *   get:
   *     summary: Get all productWarehouses
   *     tags: [ProductWarehouse]
   *     responses:
   *       200:
   *         description: Get all productWarehouses successfully.
   *       500:
   *         description: Server error
   */

  public async getAllProductWarehouses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productWarehousesData = await productWarehouseService.getProductWarehouses();

      const response: TApiResponse<ProductWarehouseResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list productWarehouses successfully",
        method: req.method,
        path: req.originalUrl,
        result: productWarehousesData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductWarehouseController();

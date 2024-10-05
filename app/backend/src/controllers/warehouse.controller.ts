import { TApiResponse } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { warehouseService } from "@services";
import { WarehouseResponseDto } from "@dto/response";
import { TCreateWarehouseRequestDto } from "@types";

class WarehouseController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateWarehouseRequestDto:
   *       type: object
   *       required:
   *         - name
   *         - address
   *       properties:
   *         name:
   *           type: string
   *           description: warehouse name
   *         address:
   *           type: string
   *           description: The address of warehouse
   *         description:
   *           type: string
   *           description: The description of warehouse
   *       example:
   *         name: Kho văn phòng
   *         address: Linh Trung, Thủ Đức
   *         description: description
   */

  /**
   * @swagger
   * tags:
   *   - name: Warehouse
   *     description: The warehouse managing API
   */

  /**
   * @swagger
   * /warehouses:
   *   post:
   *     summary: Create new warehouse
   *     tags: [Warehouse]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateWarehouseRequestDto'
   *     responses:
   *       201:
   *         description: New warehouse created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1101:
   *         description: Invalid warehouse name
   *       1102:
   *         description: Invalid warehouse address
   *
   */

  public async createWarehouse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateWarehouseRequestDto;
      const siteData = await warehouseService.createWarehouse(requestData);

      const response: TApiResponse<WarehouseResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create warehouse successfully",
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
   * /warehouses:
   *   get:
   *     summary: Get all warehouses
   *     tags: [Warehouse]
   *     responses:
   *       200:
   *         description: Get all warehouses successfully.
   *       500:
   *         description: Server error
   */

  public async getAllWarehouses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const warehousesData = await warehouseService.getAllWarehouses();

      const response: TApiResponse<WarehouseResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list warehouses successfully",
        method: req.method,
        path: req.originalUrl,
        result: warehousesData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new WarehouseController();

import { TApiResponse } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { unitService } from "@services";
import { UnitResponseDto } from "@dto/response";
import { TCreateUnitRequestDto } from "@types";

class UnitController {
   /**
   * @swagger
   * components:
   *   schemas:
   *     CreateUnitRequestDto:
   *       type: object
   *       required:
   *         - name
   *       properties:
   *         name:
   *           type: string
   *           description: unitName
   *       example:
   *         name: thùng
   */

  /**
   * @swagger
   * tags:
   *   - name: Unit
   *     description: The unit managing API
   */

  /**
   * @swagger
   * /units:
   *   post:
   *     summary: Create new unit
   *     tags: [Unit]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUnitRequestDto'
   *     responses:
   *       200:
   *         description: New unit created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1023:
   *         description: Unit existed
   *       1039:
   *         description: Invalid unit name
   *
   */

  public async createUnit(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateUnitRequestDto;
      const unitData = await unitService.createUnit(requestData);

      const response: TApiResponse<UnitResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Create site successfully",
        method: req.method,
        path: req.originalUrl,
        result: unitData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /units:
   *   get:
   *     summary: Get all units
   *     tags: [Unit]
   *     responses:
   *       200:
   *         description: Get all units successfully.
   *       500:
   *         description: Server error
   */

  public async getAllUnits(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const unitsData = await unitService.getAllUnits();

      const response: TApiResponse<UnitResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list sites successfully",
        method: req.method,
        path: req.originalUrl,
        result: unitsData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UnitController();
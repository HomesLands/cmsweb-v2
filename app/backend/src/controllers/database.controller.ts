import { TApiResponse } from "@types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { databaseService, warehouseService } from "@services";
import { WarehouseResponseDto } from "@dto/response";
import { env } from "@constants";
import { exec, spawn } from "child_process";
import moment from "moment";
import fs from "fs";
import path from "path";

class DatabaseController {
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
   *   - name: Database
   *     description: The database managing API
   */

  /**
   * @swagger
   * /database/backup:
   *   get:
   *     summary: Backup database
   *     tags: [Database]
   *     responses:
   *       200:
   *         description: Backup database successfully.
   *       500:
   *         description: Server error
   *
   */

  public async backup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const fileName = `${env.dataSource.databaseMySql}_${moment().format("YYYY_MM_DD")}.sql`;
      const dumpFilePath = path.join(__dirname, "../../", "backup", fileName);
      const wstream = fs.createWriteStream(dumpFilePath);

      // const mysqldump = spawn(
      //   "mysqldump",
      //   [
      //     "-u",
      //     env.dataSource.userMySql,
      //     `-p${env.dataSource.passwordMySql}`,
      //     env.dataSource.databaseMySql,
      //   ],
      //   { stdio: [null, process.stdout, process.stderr] }
      // );

      // if (mysqldump.stdout)
      //   mysqldump.stdout
      //     .pipe(wstream)
      //     .on("finish", () => {
      //       console.log("DB Backup Completed!");
      //     })
      //     .on("error", (err) => {
      //       console.log(err);
      //     });
      const response: TApiResponse<void> = {
        code: StatusCodes.OK,
        error: false,
        message: "Backup database successfully",
        method: req.method,
        path: req.originalUrl,
      };
      res.sendStatus(StatusCodes.OK).json(response);
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

export default new DatabaseController();

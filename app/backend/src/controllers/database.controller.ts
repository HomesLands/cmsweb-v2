import { Request, Response, NextFunction } from "express";
import { databaseService } from "@services";

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
      await databaseService.backup(res);
    } catch (error) {
      next(error);
    }
  }
}

export default new DatabaseController();

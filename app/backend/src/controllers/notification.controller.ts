import { Request, Response, NextFunction } from "express";
import { notificationService } from "@services";
import {
  TApiResponse,
  TNotificationQueryRequest,
  TPaginationOptionResponse,
} from "@types";
import { NotificationResponseDto } from "@dto/response";
import { StatusCodes } from "http-status-codes";

class NotificationController {
  /**
   * @swagger
   * tags:
   *   - name: Notification
   *     description: The notification managing API
   */

  /**
   * @swagger
   * /notifications:
   *   get:
   *     summary: Get all notifications by user
   *     tags: [Notification]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the notification are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of notification to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of notifications to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: Notifications have been retrieved successfully.
   *       500:
   *         description: Server error
   */

  public async getAllNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = req.query as unknown as TNotificationQueryRequest;
      Object.assign(query, {
        userId: req.userId,
      });

      const results = await notificationService.getAllNotifications(query);
      const response: TApiResponse<
        TPaginationOptionResponse<NotificationResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: "Notifications have been retrieved successfully",
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
   * /notifications/{slug}:
   *   get:
   *     summary: Get notification
   *     tags: [Notification]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of notification
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Notification retrieved successfully.
   *       500:
   *         description: Server error
   *
   */
  public async getNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result = await notificationService.getNotification(slug);

      const response: TApiResponse<NotificationResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Notification has been retrieved successfully",
        method: req.method,
        path: req.originalUrl,
        result,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /notifications/{slug}/read:
   *   post:
   *     summary: Read notification
   *     tags: [Notification]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of notification
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Notification retrieved successfully.
   *       500:
   *         description: Server error
   *
   */
  public async readNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result = await notificationService.readNotification(slug);

      const response: TApiResponse<NotificationResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Notification has been updated successfully",
        method: req.method,
        path: req.originalUrl,
        result,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();

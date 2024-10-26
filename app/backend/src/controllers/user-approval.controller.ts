import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { userApprovalService } from "@services";
import { TApiResponse, TPaginationOptionResponse, TQueryRequest } from "@types";
import { UserApprovalFormResponseDto } from "@dto/response";

class UserApprovalController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     UpdateUserRoleRequestDto:
   *       type: array
   *       description: List of role slug being requested.
   *       items:
   *         type: string
   *         example: ""
   */

  /**
   * @swagger
   * tags:
   *   - name: UserApproval
   *     description: The user approval managing API
   */

  /**
   * @swagger
   * /userApprovals:
   *   get:
   *     summary: Get user approvals for product requisition form
   *     tags: [UserApproval]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the product requisition forms are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of product requisition forms to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of product requisition forms to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: User approval have been retrieved successfully.
   *       500:
   *         description: Server error
   */
  public async getUserApprovals(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId = "" } = req;
      const query = req.query as unknown as TQueryRequest;
      const results = await userApprovalService.getUserApprovals(userId, query);
      const response: TApiResponse<
        TPaginationOptionResponse<UserApprovalFormResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: `User approval forms have been retrieved successfully`,
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
   * /userApprovals/{slug}:
   *   get:
   *     summary: Get user approval for product requisition form
   *     tags: [UserApproval]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of user approval
   *         example: slug-123
   *     responses:
   *       200:
   *         description: User approval has been retrieved successfully.
   *       500:
   *         description: Server error
   */
  public async getUserApproval(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug = "" } = req.params;
      const results = await userApprovalService.getUserApproval(slug);
      const response: TApiResponse<UserApprovalFormResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `User approval forms have been retrieved successfully`,
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

export default new UserApprovalController();

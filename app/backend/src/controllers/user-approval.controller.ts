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
   *     summary: Get user approval for product requisition form
   *     tags: [UserApproval]
   *     responses:
   *       200:
   *         description: User approval has been retrieved successfully.
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
}

export default new UserApprovalController();

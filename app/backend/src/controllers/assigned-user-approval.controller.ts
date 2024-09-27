import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { TApiResponse } from "@types";
import { assignedUserApprovalService } from "@services";
import { AssignedUserApprovalResponseDto } from "@dto/response";
import { TCreateAssignedUserApprovalRequestDto } from "@types";

class AssignedUserApprovalController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateAssignedUserApprovalRequestDto:
   *       type: object
   *       required:
   *         - formType
   *         - roleApproval
   *         - user
   *       properties:
   *         formType:
   *           type: string
   *           description: The type of form
   *         roleApproval:
   *           type: string
   *           description: The role of user in approval form
   *         user:
   *           type: string
   *           description: user slug
   *       example:
   *         formType: product_requisition_form
   *         roleApproval: approval_stage_1
   *         user: user-slug-123
   */

  /**
   * @swagger
   * tags:
   *   - name: AssignedUserApproval
   *     description: The assignedUserApproval managing API
   */

  /**
   * @swagger
   * /assignedUserApprovals:
   *   post:
   *     summary: Create new assignedUserApproval
   *     tags: [AssignedUserApproval]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateAssignedUserApprovalRequestDto'
   *     responses:
   *       201:
   *         description: New assignedUserApproval created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *
   */

  public async createAssignedUserApproval(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateAssignedUserApprovalRequestDto;
      const assignedUserApprovalData = 
        await assignedUserApprovalService.createAssignedUserApproval(requestData);

      const response: TApiResponse<AssignedUserApprovalResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "Create assignedUserApproval successfully",
        method: req.method,
        path: req.originalUrl,
        result: assignedUserApprovalData,
      };
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /assignedUserApprovals:
   *   get:
   *     summary: Get all assignedUserApprovals
   *     tags: [AssignedUserApproval]
   *     responses:
   *       200:
   *         description: Get all assignedUserApprovals successfully.
   *       500:
   *         description: Server error
   */

  public async getAllAssignedUserApprovals(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const assignedUserApprovalsData = await assignedUserApprovalService.getAllAssignedUserApprovals();

      const response: TApiResponse<AssignedUserApprovalResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list assignedUserApprovals successfully",
        method: req.method,
        path: req.originalUrl,
        result: assignedUserApprovalsData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new AssignedUserApprovalController();

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import {
  TApiResponse,
  TGetAssignedUserApprovalRequestDto,
  TUpdateAssignedUserApprovalRequestDto,
} from "@types";
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
   *         - site
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
   *         site:
   *           type: string
   *           description: site slug
   *       example:
   *         formType: product-requisition-form
   *         roleApproval: approval_stage_1
   *         user: user-slug-123
   *         site: site-slug-123
   *
   *     UpdateAssignedUserApprovalRequestDto:
   *       type: object
   *       required:
   *         - formType
   *         - roleApproval
   *         - user
   *         - site
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
   *         site:
   *           type: string
   *           description: site slug
   *       example:
   *         formType: product-requisition-form
   *         roleApproval: approval_stage_1
   *         user: user-slug-123
   *         site: site-slug-123
   */

  /**
   * @swagger
   * tags:
   *   - name: AssignedUserApproval
   *     description: The assigned user approval managing API
   */

  /**
   * @swagger
   * /assignedUserApprovals:
   *   post:
   *     summary: Create new assigned user approval
   *     tags: [AssignedUserApproval]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateAssignedUserApprovalRequestDto'
   *     responses:
   *       201:
   *         description: New assigned user approval created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1004:
   *         description: User not found
   *       1083:
   *         description: Invalid form type
   *       1068:
   *         description: Invalid role approval
   *       1080:
   *         description: Invalid user slug
   *       1112:
   *         description: Assigned user approval this level for site is existed
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
        await assignedUserApprovalService.createAssignedUserApproval(
          requestData
        );

      const response: TApiResponse<AssignedUserApprovalResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "New assigned user approval created successfully",
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
   *     summary: Get assigned user approvals
   *     tags: [AssignedUserApproval]
   *     parameters:
   *       - in: query
   *         name: formType
   *         schema:
   *           type: string
   *         description: The form type of product requisition form.
   *         example: product_requisition_form
   *       - in: query
   *         name: roleApproval
   *         schema:
   *           type: string
   *         description: The level approval of product requisition form.
   *         example: approval_stage_1
   *       - in: query
   *         name: site
   *         schema:
   *           type: string
   *         description: The site slug where the approval user approval form.
   *         example: site-slug-123
   *       - in: query
   *         name: user
   *         schema:
   *           type: string
   *         description: The user slug who is assigned approval user.
   *         example: user-slug-123
   *     responses:
   *       200:
   *         description: Get assigned user approvals successfully.
   *       500:
   *         description: Server error
   *       1068:
   *         description: Invalid role approval
   *       1083:
   *         description: Invalid form type
   */

  public async getAssignedUserApprovals(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.query as TGetAssignedUserApprovalRequestDto;
      const assignedUserApprovalsData =
        await assignedUserApprovalService.getAssignedUserApprovals(requestData);

      const response: TApiResponse<AssignedUserApprovalResponseDto[]> = {
        code: StatusCodes.OK,
        error: false,
        message: "Get list assigned user approvals successfully",
        method: req.method,
        path: req.originalUrl,
        result: assignedUserApprovalsData,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /assignedUserApprovals/{slug}:
   *   patch:
   *     summary: Update assigned user approval
   *     tags: [AssignedUserApproval]
   *     parameters:
   *       - name: slug
   *         in: path
   *         required: true
   *         type: string
   *         description: assigned user approval slug
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateAssignedUserApprovalRequestDto'
   *     responses:
   *       200:
   *         description: Update assigned user approval successfully.
   *       500:
   *         description: Server error
   *       1127:
   *         description: Assigned user approval not found
   *       1051:
   *         description: Site not found
   *       1048:
   *         description: Approval user not found
   *       1083:
   *         description: Invalid form type
   *       1068:
   *         description: Invalid role approval
   *       1080:
   *         description: Invalid user slug
   *       1112:
   *         description: Assigned user approval this level for site is existed
   */
  public async updateAssignedUserApproval(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const requestData = req.body as TUpdateAssignedUserApprovalRequestDto;
      Object.assign(requestData, { slug });

      const result =
        await assignedUserApprovalService.updateAssignedUserApproval(
          requestData
        );
      const response: TApiResponse<AssignedUserApprovalResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "The assigned user approval updated successfully",
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
   * /assignedUserApprovals/{slug}:
   *   delete:
   *     summary: Delete assigned user approval
   *     tags: [AssignedUserApproval]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of assigned user approval
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Assigned user approval deleted successfully.
   *       500:
   *         description: Server error
   *
   */
  public async deleteAssignedUserApproval(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result =
        await assignedUserApprovalService.deleteAssignedUserApproval(slug);
      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: `Assigned user approval has been deleted successfully`,
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

export default new AssignedUserApprovalController();

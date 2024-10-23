import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { authorityService } from "@services";
import {
  TApiResponse,
  TCreateAuthorityRequestDto,
  TPaginationOptionResponse,
  TQueryRequest,
  TUpdateAuthorityRequestDto,
} from "@types";
import { AuthorityResponseDto } from "@dto/response";

class AuthorityController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateAuthorityRequestDto:
   *       type: object
   *       required:
   *         - nameNormalize
   *         - description
   *         - nameDisplay
   *       properties:
   *         nameNormalize:
   *           type: string
   *           description: Authority code
   *         nameDisplay:
   *           type: string
   *           description: Name display for authority
   *         description:
   *           type: string
   *           description: Description for authority
   *       example:
   *         nameNormalize: CREATE_USER
   *         nameDisplay: Create user
   *         description: Enable create user
   *
   *     UpdateAuthorityRequestDto:
   *       type: object
   *       required:
   *         - nameNormalize
   *         - description
   *         - nameDisplay
   *       properties:
   *         nameNormalize:
   *           type: string
   *           description:  Authority code
   *         description:
   *           type: string
   *           description: Description for authority
   *         nameDisplay:
   *           type: string
   *           description: Name display for authority
   *       example:
   *         nameNormalize: CREATE_USER
   *         nameDisplay: Tạo người dùng
   *         description: Cho phép tạo người dùng mới
   *
   */

  /**
   * @swagger
   * tags:
   *   - name: Authority
   *     description: The authority managing API
   */

  /**
   * @swagger
   * /authorities:
   *   get:
   *     summary: Get all authorities
   *     tags: [Authority]
   *     parameters:
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         required: true
   *         description: The order in which the authorities are sorted (ASC, DESC)
   *         example: ASC
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of authorities to skip
   *         example: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *         required: true
   *         description: The number of authorities to retrieve
   *         example: 10
   *     responses:
   *       200:
   *         description: Authorities have been retrieved successfully.
   *       500:
   *         description: Server error
   *       1071:
   *         description: Authority could not be found
   */
  public async getAllAuthorities(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plainData = req.query as unknown as TQueryRequest;
      const results = await authorityService.getAllAuthorities(plainData);

      const response: TApiResponse<
        TPaginationOptionResponse<AuthorityResponseDto[]>
      > = {
        code: StatusCodes.OK,
        error: false,
        message: "Authorities have been retrieved successfully",
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
   * /authorities/{slug}:
   *   get:
   *     summary: Get authority by slug
   *     tags: [Authority]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The authority identity
   *     responses:
   *       200:
   *         description: Get all authorities successfully.
   *       500:
   *         description: Server error
   *       1071:
   *         description: Authority could not be found
   */

  public async getAuthorityBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const results = await authorityService.getAuthorityBySlug(slug);
      const response: TApiResponse<AuthorityResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: `Get authority with slug ${slug} successfully`,
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
   * /authorities:
   *   post:
   *     summary: Create authority
   *     tags: [Authority]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateAuthorityRequestDto'
   *     responses:
   *       200:
   *         description: Create role successfully.
   *       500:
   *         description: Server error
   */
  public async createAuthority(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TCreateAuthorityRequestDto;

      const result: AuthorityResponseDto =
        await authorityService.createAuthority(requestData);
      const response: TApiResponse<AuthorityResponseDto> = {
        code: StatusCodes.CREATED,
        error: false,
        message: "The authority created successfully",
        method: req.method,
        path: req.originalUrl,
        result,
      };

      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /authorities/{slug}:
   *   patch:
   *     summary: Update authority
   *     tags: [Authority]
   *     parameters:
   *       - name: slug
   *         in: path
   *         required: true
   *         type: string
   *         description: Authority slug
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateAuthorityRequestDto'
   *     responses:
   *       200:
   *         description: Update authority successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *       1071:
   *         description: Authority could not be found
   *
   */
  public async updateAuthority(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const requestData = req.body as TUpdateAuthorityRequestDto;
      const result: AuthorityResponseDto =
        await authorityService.updateAuthority(slug, requestData, req.ability);
      const response: TApiResponse<AuthorityResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "The authority updated successfully",
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
   * /authorities/{slug}:
   *   delete:
   *     summary: Delete authority
   *     tags: [Authority]
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of authority
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Authority deleted successfully.
   *       500:
   *         description: Server error
   *       1071:
   *         description: Authority not found
   *
   */
  public async deleteAuthority(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const result = await authorityService.deleteAuthority(slug);
      const response: TApiResponse<string> = {
        code: StatusCodes.OK,
        error: false,
        message: `Authority has been deleted successfully`,
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

export default new AuthorityController();

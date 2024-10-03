import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { authorityService } from "@services";
import { TApiResponse, TCreateAuthorityRequestDto } from "@types";
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
   *       properties:
   *         nameNormalize:
   *           type: string
   *           description: Authority code.
   *         description:
   *           type: string
   *           description: Description for authority
   *       example:
   *         nameNormalize: CREATE_USER
   *         description: Enable create user
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
   *     responses:
   *       200:
   *         description: Get all authorities successfully.
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
      const results = await authorityService.getAllAuthorities();
      const response: TApiResponse<AuthorityResponseDto[]> = {
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
}

export default new AuthorityController();

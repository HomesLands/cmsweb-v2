import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { authService } from "@services";
import { IApiResponse } from "types";
import { AuthenticationResponseDto } from "@dto/response";
import { RegistrationRequestDto } from "@dto/request";
import { logger } from "@lib";

class AuthController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     AuthenticationRequestDto:
   *       type: object
   *       required:
   *         - username
   *         - password
   *       properties:
   *         username:
   *           type: string
   *           description: username
   *         password:
   *           type: string
   *           description: password
   *       example:
   *         username: username
   *         password: Pass@1234
   *
   *     RegistrationRequestDto:
   *       type: object
   *       required:
   *         - username
   *         - password
   *         - firstName
   *         - lastName
   *       properties:
   *         username:
   *           type: string
   *           description: username
   *         password:
   *           type: string
   *           description: password
   *         firstName:
   *           type: string
   *           description: firstName
   *         lastName:
   *           type: string
   *           description: lastName
   *       example:
   *         username: username
   *         password: Pass@1234
   *         firstName: John
   *         lastName: Doe
   */

  /**
   * @swagger
   * tags:
   *   - name: Auth
   *     description: The auth managing API
   */

  /**
   * @swagger
   * /auth/authenticate:
   *   post:
   *     summary: Authentication
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/AuthenticationRequestDto'
   *     responses:
   *       200:
   *         description: User authenticated.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *
   */
  public async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await authService.authenticate(req);
      const response: IApiResponse<AuthenticationResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "",
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
   * /auth/register:
   *   post:
   *     summary: Register new account
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/RegistrationRequestDto'
   *     responses:
   *       200:
   *         description: New account created successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *
   */
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as RegistrationRequestDto;
      await authService.register(requestData);

      const response: IApiResponse<void> = {
        code: StatusCodes.OK,
        error: false,
        message: "Registration successfully",
        method: req.method,
        path: req.originalUrl,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

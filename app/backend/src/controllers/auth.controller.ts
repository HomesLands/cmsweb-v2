import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { authService } from "@services";
import {
  TApiResponse,
  TLogoutRequestDto,
  TRefreshTokenRequestDto,
  TRegistrationRequestDto,
} from "types";
import { AuthenticationResponseDto } from "@dto/response";

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
   *         username: johndoe
   *         password: Pass@1234
   *
   *     RegistrationRequestDto:
   *       type: object
   *       required:
   *         - username
   *         - password
   *         - fullname
   *       properties:
   *         username:
   *           type: string
   *           description: username
   *         password:
   *           type: string
   *           description: password
   *         fullname:
   *           type: string
   *           description: firstName
   *       example:
   *         username: johndoe
   *         password: Pass@1234
   *         fullname: John Doe
   *
   *     RefreshTokenRequestDto:
   *       type: object
   *       required:
   *         - expiredToken
   *         - refreshToken
   *       properties:
   *         expiredToken:
   *           type: string
   *           description: Expired token
   *         refreshToken:
   *           type: string
   *           description: Refresh token
   *       example:
   *         expiredToken: ""
   *         refreshToken: ""
   *
   *     LogoutRequestDto:
   *       type: object
   *       required:
   *         - token
   *         - refreshToken
   *       properties:
   *         token:
   *           type: string
   *           description: Token
   *         refreshToken:
   *           type: string
   *           description: Refresh token
   *       example:
   *         token: ""
   *         refreshToken: ""
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
      const result = await authService.authenticate(req, res, next);
      const response: TApiResponse<AuthenticationResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "User authenticated",
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
      const requestData = req.body as TRegistrationRequestDto;
      await authService.register(requestData);

      const response: TApiResponse<void> = {
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

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     summary: Refresh token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/RefreshTokenRequestDto'
   *     responses:
   *       200:
   *         description: token renew successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   */
  public async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TRefreshTokenRequestDto;
      const result = await authService.refreshToken(requestData);

      const response: TApiResponse<AuthenticationResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Refresh token successfully",
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
   * /auth/logout:
   *   post:
   *     summary: Logout
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/LogoutRequestDto'
   *     responses:
   *       200:
   *         description: Token remove successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   */
  public async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TLogoutRequestDto;
      await authService.logout(requestData);

      const response: TApiResponse<AuthenticationResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Logout successfully",
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

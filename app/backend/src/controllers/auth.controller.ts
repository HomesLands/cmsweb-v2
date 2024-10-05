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
   *     AuthenticationResponseDto:
   *       type: object
   *       required:
   *         - token
   *         - refreshToken
   *         - expireTime
   *         - expireTimeRefreshToken
   *       example:
   *         token: token
   *         refreshToken: refreshToken
   *         expireTime: expireTime
   *         expireTimeRefreshToken: expireTimeRefreshToken
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
   *               $ref: '#/components/schemas/AuthenticationResponseDto'
   *       401:
   *         description: Unauthorized
   *       1021:
   *         description: Token expiration is not exist
   *       1003:
   *         description: Username is not valid
   *       1008:
   *         description: Password is not valid
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
   *       1003:
   *         description: Username is not valid
   *       1006:
   *         description: User exist
   *       1008:
   *         description: Password is not valid
   *       1011:
   *         description: Fullname is not valid
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
   *       1004:
   *         description: User not found
   *       1012:
   *         description: Token is not valid
   *       1014:
   *         description: Token is not expired
   *       1016:
   *         description: Refresh token expired, cannot create new token.
   *       1018:
   *         description: Refresh token is not valid
   *       1021:
   *         description: Token expiration is not exist
   *       1019:
   *         description: Token id is not exist
   *       1015:
   *         description: Subject is not exist
   */
  public async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as TRefreshTokenRequestDto;
      const result: AuthenticationResponseDto =
        await authService.refreshToken(requestData);

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
   *       1012:
   *         description: Token is not valid
   *       1018:
   *         description: Refresh token is not valid
   *       1019:
   *         description: Token id is not exist
   *       1021:
   *         description: Token expiration is not exist
   *       
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

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { authService } from "@services";
import { IApiResponse } from "types";
import { AuthenticationResponseDto } from "@dto/response";
import { RegistrationRequestDto } from "@dto/request";
import { GlobalException } from "@exception/global-exception";

class AuthController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     AuthenticateRequest:
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
   *              $ref: '#/components/schemas/AuthenticateRequest'
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

  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData = req.body as RegistrationRequestDto;
      const result = await authService.register(requestData);

      res.status(StatusCodes.OK).json({ message: "Signup successfully!" });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

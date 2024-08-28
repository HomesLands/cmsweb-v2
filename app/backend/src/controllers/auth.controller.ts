import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { authService } from "@services";
import { IApiResponse, IAuthenticateResponseDto } from "types";

class AuthController {
  /**
   * @swagger
   * tags:
   *   - name: Auth
   *     description: Auth Control
   */
  public async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const data = await authService.authenticate(req);
      const response: IApiResponse<IAuthenticateResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "",
        method: req.method,
        path: req.originalUrl,
        result: data,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

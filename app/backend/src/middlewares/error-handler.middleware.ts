/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IApiResponse } from "types";
import { GlobalError, ValidationError } from "@exception";

class ErrorHandlerMiddleware {
  public handler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction // Don't remove, this function will be called with 4 params
  ): void {
    if (error instanceof GlobalError || error instanceof ValidationError) {
      const response: IApiResponse<void> = {
        code: error.errorCodeValue.code,
        error: true,
        message: error.errorCodeValue.message,
        method: req.method,
        path: req.originalUrl,
      };
      res.status(error.errorCodeValue.httpStatusCode).json(response);
    } else {
      const response: IApiResponse<void> = {
        code: StatusCodes.INTERNAL_SERVER_ERROR.valueOf(),
        error: true,
        message: error.message,
        method: req.method,
        path: req.originalUrl,
      };
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }
}

export const errorHandlerMiddleware = new ErrorHandlerMiddleware();

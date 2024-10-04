/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Code, QueryFailedError } from "typeorm";

import { TApiResponse } from "types";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import _ from "lodash";

class ErrorHandlerMiddleware {
  public handler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction // Don't remove, this function will be called with 4 params
  ): void {
    if (error instanceof GlobalError || error instanceof ValidationError) {
      const response: TApiResponse<void> = {
        code: error.errorCodeValue.code,
        error: true,
        message: error.errorCodeValue.message,
        method: req.method,
        path: req.originalUrl,
      };
      res.status(error.errorCodeValue.httpStatusCode).json(response);
      return;
    }
    if (error instanceof QueryFailedError && _.has(error, "code")) {
      if (error.code === "ER_DUP_ENTRY") {
        const response: TApiResponse<void> = {
          code: ErrorCodes.DUPLICATE_ENTRY.code,
          error: true,
          message: error.message,
          method: req.method,
          path: req.originalUrl,
        };
        res.status(StatusCodes.CONFLICT).json(response);
      }
      return;
    }
    const response: TApiResponse<void> = {
      code: StatusCodes.INTERNAL_SERVER_ERROR.valueOf(),
      error: true,
      message: error.message,
      method: req.method,
      path: req.originalUrl,
    };
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    return;
  }
}

export const errorHandlerMiddleware = new ErrorHandlerMiddleware();

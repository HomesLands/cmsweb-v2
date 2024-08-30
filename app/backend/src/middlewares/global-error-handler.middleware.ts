import { Request, Response, NextFunction } from "express";
import { IApiResponse } from "types";
import { GlobalException } from '@exception/global-exception';
import { StatusResponseRecord } from '@exception/error-code';

export function globalErrorHandler(
  error: GlobalException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response: IApiResponse<void> = {
    code: error.statusCode || StatusResponseRecord.INTERNAL_SERVER_ERROR.code,
    error: true,
    message: error.message || StatusResponseRecord.INTERNAL_SERVER_ERROR.message,
    method: req.method,
    path: req.originalUrl,
  };
  res.status(error.statusCode || StatusResponseRecord.INTERNAL_SERVER_ERROR.code).json(response);
}

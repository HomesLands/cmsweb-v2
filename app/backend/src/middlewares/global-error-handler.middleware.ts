import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IApiResponse, IAuthenticateResponseDto } from "types";
import { GlobalException } from "@exception/global-exception";
import { StatusCodeToHttpStatus } from "@exception/error-code";

export function globalErrorHandler(
  error: GlobalException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response: IApiResponse<void> = {
    code: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    error: true,
    message: error.message || "Internal Server Error",
    method: req.method,
    path: req.originalUrl,
  };
  res
    .status(
      StatusCodeToHttpStatus[error.statusCode] ||
        StatusCodes.INTERNAL_SERVER_ERROR
    )
    .json(response);
}

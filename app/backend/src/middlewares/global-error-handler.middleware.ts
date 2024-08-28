import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IApiResponse, IAuthenticateResponseDto } from "types";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const response: IApiResponse<IAuthenticateResponseDto> = {
    code: err.name || StatusCodes.INTERNAL_SERVER_ERROR,
    error: true,
    message: err.message || 'Internal Server Error',
    method: req.method,
    path: req.originalUrl,
    result: {} as IAuthenticateResponseDto,
  };
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(response);
}

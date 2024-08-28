import { Request, Response, NextFunction } from "express";

export function globalErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}

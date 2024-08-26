import { Request, Response, NextFunction } from "express";

function  globalErrorHandler (
  error: { statusCode: number; status: string; message: any; }, 
  req: Request, 
  res: Response, 
  next: NextFunction 
) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  res.status( error.statusCode ).json({
    status: error.statusCode,
    message: error.message,
  });
};

export default globalErrorHandler;
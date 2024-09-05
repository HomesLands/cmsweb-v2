import { Request, Response } from "express";
import { IApiResponse } from "types";
import { GlobalException } from "@exception";

class ErrorHandlerMiddleware {
  public handleGlobalException(
    error: GlobalException,
    req: Request,
    res: Response
  ): void {
    console.log("Here");
    // const response: IApiResponse<void> = {
    //   code: error.errorCodeValue.code,
    //   error: true,
    //   message: error.errorCodeValue.message,
    //   method: req.method,
    //   path: req.originalUrl,
    // };
    res.status(500).json({ message: "error" });
  }
}

export const errorHandlerMiddleware = new ErrorHandlerMiddleware();

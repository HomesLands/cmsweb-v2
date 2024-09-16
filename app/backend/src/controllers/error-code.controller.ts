import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { TApiResponse, TErrorCode } from "@types";
import { ErrorCodes } from "@exception";

class ErrorCodeController {
  public getAllErrorCodes(req: Request, res: Response) {
    const response: TApiResponse<TErrorCode> = {
      code: StatusCodes.OK,
      error: false,
      message: `Get all error codes successfully`,
      method: req.method,
      path: req.originalUrl,
      result: ErrorCodes,
    };
    return res.status(StatusCodes.OK).json(response);
  }
}

export default new ErrorCodeController();

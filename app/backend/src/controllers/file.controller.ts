import { NextFunction, Request, Response } from "express";

import { fileService } from "@services";
import { StatusCodes } from "http-status-codes";
import { TApiResponse } from "@types";

class FileController {
  public async uploadFileTest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const isMultiple: boolean = true;
      // const validate = await fileService.validateFiles(req, res, isMultiple);
      const validate = await fileService.validateFiles(req, res, isMultiple);
      console.log({validate})

      const response: TApiResponse<void> = {
        code: StatusCodes.OK,
        error: false,
        message: "Upload successfully",
        method: req.method,
        path: req.originalUrl,
      };
      res.status(StatusCodes.OK).json(response);

    } catch (error) {
      next(error);
    }
  }
}

export default new FileController();
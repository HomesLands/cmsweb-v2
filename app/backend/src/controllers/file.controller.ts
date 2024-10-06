import { NextFunction, Request, Response } from "express";

import { fileService } from "@services";
import { StatusCodes } from "http-status-codes";
import { TApiResponse } from "@types";

class FileController {
  public async uploadFileDB(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validate = await fileService.uploadFile(req, res);
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

  public async getImgByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const fullFilename = req.params.name;
      const fileData = await fileService.getFileFromDB(fullFilename);

      res.writeHead(200, {
        'Content-Type': fileData.mimetype,
        'Content-Length': fileData.length,
        // 'Content-Disposition': `inline; filename="file.${fileData.extension}"`
        'Content-Disposition': `inline; filename="${fileData.name}.${fileData.extension}"`
      });
      res.end(fileData.data);
    } catch (error) {
      next(error);
    }
  }
}

export default new FileController();
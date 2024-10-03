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
      const isMultiple: boolean = true;
      const validate = await fileService.uploadFilesDB(req, res, isMultiple);
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
      const name = req.params.name;
      const fileData = await fileService.getFileFromDB(name);

      res.writeHead(200, {
        'Content-Type': fileData.mimetype,
        'Content-Length': fileData.length,
        'Content-Disposition': `attachment; filename="file.${fileData.extension}"`
      });
      res.end(fileData.data);
    } catch (error) {
      next(error);
    }
  }
}

export default new FileController();
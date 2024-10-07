import { NextFunction, Request, Response } from "express";

import { fileService } from "@services";
import { GlobalError, ErrorCodes } from "@exception";

class FileController {
  public async getFileByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filename = req.params.name;
      const fileData = await fileService.getFileByName(filename);

      if (!fileData?.data) throw new GlobalError(ErrorCodes.FILE_NOT_FOUND);

      res.writeHead(200, {
        "Content-Type": fileData.mimetype,
        "Content-Length": fileData.size,
        "Content-Disposition": `inline; filename="${fileData.name}.${fileData.extension}"`,
      });
      res.end(Buffer.from(fileData.data, "base64"));
    } catch (error) {
      next(error);
    }
  }
}

export default new FileController();

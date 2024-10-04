import multer, { FileFilterCallback } from "multer";
import { Request, Response } from "express";

import { File } from "@entities";
import { fileRepository } from "@repositories";
import { TFileData } from "@types";
import { GlobalError } from "@exception/global-error";
import { ErrorCodes } from "@exception/error-code";

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/vnd.ms-excel", // Excel files (.xls)
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel files (.xlsx)
  "application/msword", // Word files (.doc)
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word files (.docx)
];
const maxSize = 10 * 1024 * 1024; // 10 MB
const memoryStorage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(null, false);
  }
  cb(null, true);
};

export class FileUploadService {
  public async validateFiles(
    req: Request,
    res: Response,
    isMultiple: boolean
  ): Promise<{ success: boolean; message?: string }> {
    return new Promise((resolve, reject) => {
      const validateInstance = isMultiple
        ? multer({
            storage: memoryStorage,
            fileFilter: fileFilter,
            limits: { fileSize: maxSize },
          }).array("file", 20)
        : multer({
            storage: memoryStorage,
            fileFilter: fileFilter,
            limits: { fileSize: maxSize },
          }).single("file");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validateInstance(req, res, (err: any) => {
        if (err) {
          reject({
            error: true,
            message: err.message,
          });
        } else {
          resolve({ success: true });
        }
      });
    });
  }

  public async uploadFilesDB(
    req: Request,
    res: Response,
    isMultiple: boolean
  ): Promise<{ success: boolean; files?: File[] }> {
    return new Promise((resolve, reject) => {
      const uploadInstance = isMultiple
        ? multer({
            storage: memoryStorage,
            fileFilter: fileFilter,
            limits: { fileSize: maxSize },
          }).array("file", 20)
        : multer({
            storage: memoryStorage,
            fileFilter: fileFilter,
            limits: { fileSize: maxSize },
          }).single("file");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      uploadInstance(req, res, async (err: any) => {
        if (err) {
          reject({
            error: true,
            message: err.message,
          });
        } else {
          const fileList: File[] = [];
          if (isMultiple && req.files) {
            const files = req.files as Express.Multer.File[];
            for( let i = 0; i < files.length; i++) {
              const fileData = await fileRepository.createAndSave({
                data: files[i].buffer.toString('base64'),
                name: `${files[i].originalname.split(".")[0]}-${Date.now()}`,
                extension: files[i].originalname.split(".")[1],
                mimetype: files[i].mimetype,
                size: files[i].size,
              });
              fileList.push(fileData);
            }
          } else if (req.file) {
            const file = req.file as Express.Multer.File;

            const fileData = await fileRepository.createAndSave({
              data: file.buffer.toString('base64'),
              name: `${file.originalname.split(".")[0]}-${Date.now()}`,
              extension: file.originalname.split(".")[1],
              mimetype: file.mimetype,
              size: file.size,
            });
            fileList.push(fileData);
          }
          resolve({ success: true, files: fileList });
        }
      });
    });
  }

  public async getFileFromDB(
    name: string
  ): Promise<TFileData> {
    const imageData = await fileRepository.findOneBy({ name });
    if (!imageData) throw new GlobalError(ErrorCodes.FILE_NOT_FOUND); 

    if(!imageData.data
      || !imageData.name
      || !imageData.extension
      || !imageData.mimetype
    ) throw new GlobalError(ErrorCodes.FILE_NOT_FOUND);

    const buffer = Buffer.from(imageData.data, 'base64');
    return {
      data: buffer,
      extension: imageData.extension,
      mimetype: imageData.mimetype,
      length: buffer.length
    };
  }
}

export default new FileUploadService();

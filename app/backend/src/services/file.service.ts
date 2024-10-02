import multer, { FileFilterCallback } from "multer";
import { Request, Response } from "express";
import { fileRepository } from "@repositories";
import fs from "fs";

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(".")[0];
    const fileType = file.originalname.split(".")[1];
    cb(null, `${fileName}-${Date.now()}.${fileType}`);
  },
});

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

const uploadToDB = multer({ storage: memoryStorage }).single("file");

export class FileUploadService {
  // vailidate + upload
  public async validateAndUploadLocal(
    req: Request,
    res: Response,
    isMultiple: boolean
  ): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const uploadInstance = isMultiple
        ? multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: { fileSize: maxSize },
          }).array("file", 20)
        : multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: { fileSize: maxSize },
          }).single("file");

      uploadInstance(req, res, (err: any) => {
        if (err) {
          reject({
            error: true,
            message: err.message,
          });
        } else {
          const filePaths: string[] = [];
          if (isMultiple && req.files) {
            (req.files as Express.Multer.File[]).forEach((file) => {
              filePaths.push(`/public/images/${file.filename}`);
            });
          } else if (req.file) {
            filePaths.push(`/public/images/${req.file.filename}`);
          }
          resolve(filePaths);
        }
      });
    });
  }

  // only validate
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

      console.log({ file: req.file });
      console.log({ files: req.files });
      validateInstance(req, res, (err: any) => {
        if (err) {
          resolve({
            success: false as boolean,
            message: err.message,
          });
        } else {
          resolve({ success: true as boolean });
        }
      });
    });
  }

  // only upload: have validate (validateFiles method) before upload
  public async uploadFilesLocal(
    req: Request,
    res: Response,
    isMultiple: boolean
  ): Promise<{ success: boolean; paths?: string[] }> {
    return new Promise((resolve, reject) => {
      if (isMultiple && req.files) {
        const filePaths: string[] = [];

        (req.files as Express.Multer.File[]).forEach((file) => {
          const finalPath = `public/images/${
            file.originalname.split(".")[0]
          }-${Date.now()}.${file.originalname.split(".")[1]}`;
          fs.writeFileSync(finalPath, file.buffer);
          filePaths.push(`/${finalPath}`);
        });
        // resolve(filePaths);
        resolve({
          success: true,
          paths: filePaths,
        });
      } else if (req.file) {
        const file = req.file;
        const finalPath = `public/images/${
          file.originalname.split(".")[0]
        }-${Date.now()}.${file.originalname.split(".")[1]}`;
        fs.writeFileSync(finalPath, file.buffer);
        // resolve([`/${finalPath}`]);
        resolve({
          success: true,
          paths: [finalPath],
        });
      } else {
        resolve({ success: false });
      }
    });
  }

  // public async uploadFilesDB(
  //   req: Request,
  //   res: Response,
  //   isMultiple: boolean
  // ): Promise<{ success: boolean; ids?: any[] }> {
  //   return new Promise((resolve, reject) => {
  //     if (isMultiple && req.files) {
  //       const ids: any[] = [];

  //       (req.files as Express.Multer.File[]).forEach((file) => {
  //         const base64String = file.buffer.toString("base64");
  //         const fileName = file.originalname.split(".")[0];
  //         const fileType = file.originalname.split(".")[1];

  //         const dataSaved = await fileRepository.save({
  //           data: ,
  //           fileName: `${fileName}-${Date.now()}.${fileType}`,
  //         });

  //         ids.push(dataSaved);
  //       });
  //       resolve({
  //         success: true,
  //         ids: ids,
  //       });
  //       resolve({ success: true });
  //     } else if (req.file) {
  //       const file = req.file;
  //       const base64String = file.buffer;
  //       const fileName = file.originalname.split(".")[0];
  //       const fileType = file.originalname.split(".")[1];

  //       const dataSaved = await fileRepository.save({
  //         data: base64String,
  //         name: `${fileName}-${Date.now()}.${fileType}`,
  //       });
  //       resolve({
  //         success: true,
  //         ids: [dataSaved],
  //       });
  //     } else {
  //       resolve({ success: false });
  //     }
  //   });
  // }

  // public async getImgFromDB(id: string): Promise<Blob | undefined> {
  //   const imageData = await this.imageRepo.findOneBy({ id });
  //   if (!imageData) {
  //     return;
  //   }
  //   const base64Data = imageData.data;
  //   return base64Data;
  // }
}

export default new FileUploadService();

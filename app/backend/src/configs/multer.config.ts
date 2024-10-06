import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

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
const maxFileSize = 10 * 1024 * 1024; // 10 MB

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

export const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: maxFileSize },
  fileFilter,
});

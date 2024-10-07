import { Express } from "express";

export type TUploadUserSignRequestDto = {
  userId?: string;
  file?: Express.Multer.File;
};

export type TUploadUserAvatarRequestDto = TUploadUserSignRequestDto;

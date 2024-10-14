import { Express } from "express";

export type TUploadUserSignRequestDto = {
  userId?: string;
  file?: Express.Multer.File;
};

export type TChangePasswordRequestDto = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export type TUploadUserAvatarRequestDto = TUploadUserSignRequestDto;

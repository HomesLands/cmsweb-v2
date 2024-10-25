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

export type TUpdateUser = {
  fullname?: string;
  dob?: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
}

import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

import { Gender } from "@enums";
import { IsDateStringWithMessage } from "@decorator";

export class ChangePasswordRequestDto {
  @IsNotEmpty({ message: "INVALID_PASSWORD" })
  @Expose()
  @AutoMap()
  currentPassword: string;

  @IsNotEmpty({ message: "INVALID_NEW_PASSWORD" })
  @Expose()
  @AutoMap()
  newPassword: string;

  @IsNotEmpty({ message: "INVALID_CONFIRM_PASSWORD" })
  @Expose()
  @AutoMap()
  confirmPassword: string;
}

export class UpdateUser {
  @IsNotEmpty({ message: "INVALID_FULLNAME" })
  @Expose()
  @AutoMap()
  fullname: string;

  @IsNotEmpty({ message: "INVALID_USER_EMAIL" })
  @IsEmail({}, { message: "INVALID_USER_EMAIL" })
  @Expose()
  @AutoMap()
  email: string;

  @IsNotEmpty()
  @IsDateStringWithMessage({ message: "INVALID_DATE_FORMAT" })
  @Expose()
  @AutoMap()
  dob: string;

  @IsNotEmpty({ message: "INVALID_USER_GENDER" })
  @IsEnum(Gender, { message: "INVALID_USER_GENDER" })
  @Expose()
  @AutoMap()
  gender: string;

  @IsNotEmpty({ message: "INVALID_USER_ADDRESS" })
  @Expose()
  @AutoMap()
  address: string;

  @IsNotEmpty({ message: "INVALID_USER_PHONE_NUMBER" })
  @Expose()
  @AutoMap()
  phoneNumber: string;
}

import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty, MinLength } from "class-validator";

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

export class UpdateUserInfoRequestDto {
  userId: string;

  @IsNotEmpty({ message: "INVALID_DOB" })
  @Expose()
  @AutoMap()
  dob?: string;

  @IsNotEmpty({ message: "INVALID_GENDER" })
  @Expose()
  @AutoMap()
  gender?: string;

  @IsNotEmpty({ message: "INVALID_ADDRESS" })
  @Expose()
  @AutoMap()
  address?: string;

  @IsNotEmpty({ message: "INVALID_PHONENUMBER" })
  @Expose()
  @AutoMap()
  phoneNumber?: string;

  @IsNotEmpty({ message: "INVALID_FULLNAME" })
  @Expose()
  @AutoMap()
  fullname?: string;
}

export class UpdateUsernameRequestDto {
  @IsNotEmpty({ message: "INVALID_USER_SLUG" })
  @Expose()
  @AutoMap()
  userSlug: string;

  @IsNotEmpty({ message: "INVALID_USERNAME" })
  @MinLength(1, { message: "INVALID_USERNAME" })
  @Expose()
  @AutoMap()
  username?: string;
}

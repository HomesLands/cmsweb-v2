import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

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

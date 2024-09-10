import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty, MinLength } from "class-validator";

export class AuthenticationRequestDto {
  @IsNotEmpty({ message: "INVALID_USERNAME" })
  @MinLength(5, { message: "INVALID_USERNAME" })
  username: string;

  @IsNotEmpty({ message: "INVALID_PASSWORD" })
  password: string;
}

export class RegistrationRequestDto {
  @IsNotEmpty({ message: "INVALID_USERNAME" })
  @MinLength(5, { message: "INVALID_USERNAME" })
  @AutoMap()
  @Expose()
  username: string;

  @IsNotEmpty({ message: "INVALID_PASSWORD" })
  @AutoMap()
  @Expose()
  password: string;

  @IsNotEmpty({ message: "INVALID_FULLNAME" })
  @AutoMap()
  @Expose()
  fullname: string;
}

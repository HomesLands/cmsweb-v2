import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class AuthenticationRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegistrationRequestDto {
  @IsNotEmpty({ message: "INVALID_USERNAME" })
  @MinLength(5, { message: "INVALID_USERNAME" })
  @AutoMap()
  @Expose()
  username: string;

  @IsNotEmpty()
  @AutoMap()
  @Expose()
  password: string;

  @IsNotEmpty()
  @AutoMap()
  @Expose()
  firstName: string;

  @IsNotEmpty()
  @AutoMap()
  @Expose()
  lastName: string;
}

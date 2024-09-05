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
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

import { IsString, IsNotEmpty } from "class-validator";

export class AuthenticationRequestDto {
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;
}

export class RegistrationRequestDto {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

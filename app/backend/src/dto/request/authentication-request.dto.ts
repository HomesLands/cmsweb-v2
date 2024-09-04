import { IsString, IsNotEmpty } from "class-validator";

export class AuthenticationRequestDto {
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;
}

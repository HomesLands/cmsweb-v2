import { IsString, IsNotEmpty, Length, IsDefined } from "class-validator";

export class RegisterUserRequestDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstName!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastName!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  userName!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  password!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  confirmPassword!: string;
}

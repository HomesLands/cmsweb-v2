import { 
  IsString,
  IsNotEmpty,
  Length,
  IsDefined,
} from 'class-validator';

export class LoginRequestDto {
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
}

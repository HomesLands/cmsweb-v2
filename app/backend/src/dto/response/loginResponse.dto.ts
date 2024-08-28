import { Length } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class LoginResponseDto {
  @AutoMap()
  @Length(2, 50)
  firstName: string | undefined;

  @AutoMap()
  @Length(2, 50)
  lastName: string | undefined;

  @AutoMap()
  @Length(6, 20)
  userName: string | undefined;

  fullName: string | undefined;

  @AutoMap()
  id: string | undefined;

  @AutoMap()
  token: string | undefined;
}
import { Length, Contains } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UsersResponseDto {
  @AutoMap()
  @Length(50, 60)
  firstName: string | undefined;

  @AutoMap()
  @Contains("haha")
  lastName: string | undefined;

  @AutoMap()
  userName: string | undefined;

  fullName: string | undefined;

  @AutoMap()
  id: string | undefined;
}
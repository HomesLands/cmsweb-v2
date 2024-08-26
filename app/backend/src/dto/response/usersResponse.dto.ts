import {} from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UsersResponseDto {
  @AutoMap()
  firstName: string | undefined;

  @AutoMap()
  lastName: string | undefined;

  @AutoMap()
  userName: string | undefined;

  fullName: string | undefined;

  @AutoMap()
  id: string | undefined;
}
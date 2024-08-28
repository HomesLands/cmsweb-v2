import { AutoMap } from "@automapper/classes";

export class UserResponseDto {
  @AutoMap()
  firstName?: string;

  @AutoMap()
  lastName?: string;

  @AutoMap()
  username?: string;

  fullName?: string;

  @AutoMap()
  id?: string;
}

import { AutoMap } from "@automapper/classes";

export class UserResponseDto {
  @AutoMap()
  fullname?: string;

  @AutoMap()
  username?: string;

  @AutoMap()
  password?: string;

  @AutoMap()
  slug?: string;
}

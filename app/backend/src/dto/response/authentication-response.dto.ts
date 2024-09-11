import { AutoMap } from "@automapper/classes";

export class AuthenticationResponseDto {
  @AutoMap()
  token?: string;

  @AutoMap()
  expireTime?: string;
}

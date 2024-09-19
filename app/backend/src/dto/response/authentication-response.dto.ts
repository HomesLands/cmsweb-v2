import { AutoMap } from "@automapper/classes";

export class AuthenticationResponseDto {
  @AutoMap()
  token?: string;

  @AutoMap()
  refreshToken?: string;

  @AutoMap()
  expireTime?: string;

  @AutoMap()
  expireTimeRefreshToken?: string;
}

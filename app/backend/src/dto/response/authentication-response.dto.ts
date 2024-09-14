import { AutoMap } from "@automapper/classes";

export class AuthenticationResponseDto {
  @AutoMap()
  token?: string;

  @AutoMap()
  refreshToken?: string;

  @AutoMap()
  expireTime?: string;
}

export class RefreshTokenResponseDto {
  @AutoMap()
  token?: string;

  @AutoMap()
  expireTime?: string;
}

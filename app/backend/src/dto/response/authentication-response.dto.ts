import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class AuthenticationResponseDto extends BaseResponseDto {
  @AutoMap()
  token?: string;

  @AutoMap()
  refreshToken?: string;

  @AutoMap()
  expireTime?: string;

  @AutoMap()
  expireTimeRefreshToken?: string;
}

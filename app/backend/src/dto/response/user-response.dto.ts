import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class UserResponseDto extends BaseResponseDto {
  @AutoMap()
  fullname?: string;

  @AutoMap()
  username?: string;
}

export class UserPermissionResponseDto extends BaseResponseDto {
  @AutoMap()
  role?: string;

  @AutoMap()
  authorities?: string[];
}

import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";
import { RoleResponseDto } from "./role-response.dto";
import { UserResponseDto } from "./user-response.dto";

export class RolePermissionResponseDto extends BaseResponseDto {
  @AutoMap()
  role: RoleResponseDto;

  @AutoMap()
  user: UserResponseDto;
}

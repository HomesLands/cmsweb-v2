import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";
import { RoleResponseDto } from "./role-response.dto";
import { PermissionResponseDto } from "./permission-response.dto";

export class RolePermissionResponseDto extends BaseResponseDto {
  @AutoMap()
  role: RoleResponseDto;

  @AutoMap()
  permission: PermissionResponseDto;
}

import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";
import { RolePermissionResponseDto } from "./role-permission-response.dto";

export class RoleResponseDto extends BaseResponseDto {
  @AutoMap()
  nameNormalize?: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  nameDisplay?: string;

  @AutoMap()
  rolePermissions: RolePermissionResponseDto[];
}

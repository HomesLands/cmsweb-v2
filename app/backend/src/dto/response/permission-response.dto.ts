import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";
import { RoleResponseDto } from "./role-response.dto";
import { AuthorityResponseDto } from "./authority-response.dto";

export class PermissionResponseDto extends BaseResponseDto {
  @AutoMap()
  role: RoleResponseDto;

  @AutoMap()
  authority: AuthorityResponseDto;
}

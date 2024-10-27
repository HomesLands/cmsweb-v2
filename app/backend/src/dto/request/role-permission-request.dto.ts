import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";

export class CreateRolePermissionRequestDto {
  @Expose()
  @AutoMap()
  roleSlug?: string;

  @Expose()
  @AutoMap()
  permissionSlug?: string;
}

export class UpdateRolePermissionRequestDto extends CreateRolePermissionRequestDto {
  slug: string;
}

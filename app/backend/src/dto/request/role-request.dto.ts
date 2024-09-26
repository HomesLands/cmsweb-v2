import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { RolePrefix } from "decorator";

export class CreateRoleRequestDto {
  @RolePrefix({ message: "INVALID_ROLE_PREFIX" })
  @Expose()
  @AutoMap()
  nameNormalize?: string;

  @Expose()
  @AutoMap()
  description?: string;
}

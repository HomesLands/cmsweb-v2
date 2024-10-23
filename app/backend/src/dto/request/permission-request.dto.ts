import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreatePermissionRequestDto {
  @IsNotEmpty({ message: "INVALID_RESOURCE_SLUG" })
  @Expose()
  @AutoMap()
  resourceSlug?: string;

  @IsNotEmpty({ message: "INVALID_AUTHORITY_SLUG" })
  @Expose()
  @AutoMap()
  authoritySlug?: string;

  @Expose()
  @AutoMap()
  requiredOwner?: boolean;
}

export class UpdatePermissionRequestDto extends CreatePermissionRequestDto {
  slug?: string;
}

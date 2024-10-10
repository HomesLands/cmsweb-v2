import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";

export class CreatePermissionRequestDto {
  // @IsNotEmpty({message: "INVALID_PRODUCT_NAME"})
  @Expose()
  @AutoMap()
  resourceSlug?: string;

  // @IsNotEmpty({ message: "INVALID_PRODUCT_UNIT" })
  @Expose()
  @AutoMap()
  authoritySlug?: string;

  @Expose()
  @AutoMap()
  requiredOwner?: boolean;
}

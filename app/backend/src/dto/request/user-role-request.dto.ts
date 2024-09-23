import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateUserRoleRequestDto {
  // @IsNotEmpty({message: "INVALID_PRODUCT_NAME"})
  @Expose()
  @AutoMap()
  roleSlug?: string;

  // @IsNotEmpty({ message: "INVALID_PRODUCT_UNIT" })
  @Expose()
  @AutoMap()
  userSlug?: string;
}

import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateAuthorityRequestDto {
  // @IsNotEmpty({message: "INVALID_PRODUCT_NAME"})
  @Expose()
  @AutoMap()
  nameNormalize?: string;

  // @IsNotEmpty({ message: "INVALID_PRODUCT_UNIT" })
  @Expose()
  @AutoMap()
  description?: string;
}

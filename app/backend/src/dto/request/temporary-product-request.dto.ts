import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateTemporaryProductRequestDto {
  @IsNotEmpty({message: "INVALID_TEMPORARY_REQUEST_PRODUCT_NAME"})
  @Expose()
  @AutoMap()
  name?: string;

  @IsNotEmpty({message: "INVALID_TEMPORARY_REQUEST_PRODUCT_PROVIDER"})
  @Expose()
  @AutoMap()
  provider?: string;

  @IsNotEmpty({message: "INVALID_UNIT_SLUG"})
  @Expose()
  @AutoMap()
  unit?: string;

  @IsNotEmpty({message: "INVALID_TEMPORARY_REQUEST_PRODUCT_DESCRIPTION"})
  @Expose()
  @AutoMap()
  description?: string;
}
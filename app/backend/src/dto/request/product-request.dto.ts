import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateIf } from "class-validator";

export class CreateProductRequestDto {
  @IsNotEmpty({message: "INVALID_PRODUCT_NAME"})
  @Expose()
  @AutoMap()
  name?: string;

  @IsOptional()
  @IsNotEmpty({message: "INVALID_PRODUCT_CODE"})
  @Expose()
  @AutoMap()
  code?: string;

  @IsNotEmpty({message: "INVALID_PRODUCT_PROVIDER"})
  @Expose()
  @AutoMap()
  provider?: string;

  @IsNotEmpty({message: "INVALID_PRODUCT_UNIT"})
  @Expose()
  @AutoMap()
  unit?: string;

  // if code empty, must have description
  // if have code, description is optional 
  @ValidateIf(o => !o.code)
  @IsNotEmpty({message: "INVALID_PRODUCT_UNIT"})
  @Expose()
  @AutoMap()
  description?: string;
}
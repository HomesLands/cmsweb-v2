import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateProductWarehouseRequestDto {
  @IsNotEmpty({message: "INVALID_QUANTITY_PRODUCT_WAREHOUSE"})
  @Expose()
  @AutoMap()
  quantity?: string;

  @IsNotEmpty({message: "INVALID_WAREHOUSE_SLUG"})
  @Expose()
  warehouse?: string;

  @IsNotEmpty({message: "INVALID_PRODUCT_SLUG"})
  @Expose()
  product?: string;
}
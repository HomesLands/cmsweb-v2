import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateWarehouseRequestDto {
  @IsNotEmpty({message: "INVALID_WAREHOUSE_NAME"})
  @Expose()
  @AutoMap()
  name?: string;

  @IsNotEmpty({message: "INVALID_WAREHOUSE_ADDRESS"})
  @AutoMap()
  @Expose()
  address?: string;

  @IsOptional()
  @AutoMap()
  @Expose()
  description?: string;
}
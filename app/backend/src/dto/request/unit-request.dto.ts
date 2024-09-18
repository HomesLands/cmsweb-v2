import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateUnitRequestDto {
  @IsNotEmpty({message: "INVALID_UNIT_NAME"})
  @Expose()
  @AutoMap()
  name?: string;
}
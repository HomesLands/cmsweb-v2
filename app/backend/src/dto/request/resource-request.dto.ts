import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateResourceRequestDto {
  @IsNotEmpty({ message: "INVALID_RESOURCE_NAME" })
  @Expose()
  @AutoMap()
  name?: string;
}

export class UpdateResourceRequestDto {
  @IsNotEmpty({ message: "INVALID_RESOURCE_NAME" })
  @Expose()
  @AutoMap()
  name?: string;
}

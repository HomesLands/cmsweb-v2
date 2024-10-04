import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateAuthorityRequestDto {
  @IsNotEmpty({ message: "INVALID_NAME_NORMALIZE" })
  @Expose()
  @AutoMap()
  nameNormalize?: string;

  @Expose()
  @AutoMap()
  description?: string;

  @Expose()
  @AutoMap()
  @IsNotEmpty({ message: "INVALID_NAME_DISPLAY" })
  nameDisplay?: string;
}

export class UpdateAuthorityRequestDto {
  @IsNotEmpty({ message: "INVALID_NAME_NORMALIZE" })
  @Expose()
  @AutoMap()
  nameNormalize?: string;

  @IsNotEmpty({ message: "INVALID_NAME_DISPLAY" })
  @Expose()
  @AutoMap()
  nameDisplay?: string;

  @Expose()
  @AutoMap()
  description?: string;
}

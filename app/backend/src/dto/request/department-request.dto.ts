import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateDepartmentRequestDto {
  @IsNotEmpty({ message: "INVALID_NAME_NORMALIZE_DEPARTMENT" })
  @Expose()
  @AutoMap()
  nameNormalize?: string;

  @IsNotEmpty({ message: "INVALID_DESCRIPTION_DEPARTMENT" })
  @Expose()
  @AutoMap()
  description?: string;

  @IsNotEmpty({ message: "INVALID_SITE_SLUG" })
  @Expose()
  @AutoMap()
  site?: string;
}

export class UpdateDepartmentRequestDto extends CreateDepartmentRequestDto {
  slug?: string;
}

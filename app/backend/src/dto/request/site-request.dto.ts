import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateSiteRequestDto {
  @IsNotEmpty({ message: "INVALID_SITE_NAME" })
  @Expose()
  @AutoMap()
  name?: string;

  @IsNotEmpty({ message: "INVALID_COMPANY_SLUG" })
  @Expose()
  company?: string;
}

export class UpdateSiteRequestDto extends CreateSiteRequestDto {
  @IsNotEmpty({ message: "INVALID_SITE_SLUG" })
  @Expose()
  slug?: string;
}

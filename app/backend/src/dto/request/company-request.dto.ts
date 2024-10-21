import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";

export class CreateCompanyRequestDto {
  @IsNotEmpty({ message: "INVALID_COMPANY_NAME" })
  @Expose()
  @AutoMap()
  name?: string;
}

export class UpdateCompanyRequestDto {
  @IsNotEmpty({ message: "INVALID_COMPANY_NAME" })
  @Expose()
  @AutoMap()
  name?: string;

  @IsNotEmpty({ message: "INVALID_COMPANY_SLUG" })
  @Expose()
  @AutoMap()
  slug?: string;
}

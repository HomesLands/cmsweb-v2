import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateSiteRequestDto {
  @IsNotEmpty({message: "INVALID_SITE_NAME"})
  @Expose()
  @AutoMap()
  name?: string;

  @IsNotEmpty({message: "INVALID_SITE_ADDRESS"})
  @Expose()
  @AutoMap()
  address?: string;

  @IsNotEmpty({message: "INVALID_SITE_MANAGER_ID"})
  @Expose()
  manager?: string;
}
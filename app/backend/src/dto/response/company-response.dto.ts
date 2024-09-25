import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class CompanyResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  slug?: string;

  director?: string;

  directorSlug?: string;
}

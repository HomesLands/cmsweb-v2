import { AutoMap } from "@automapper/classes";
import { SiteResponseDto } from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class ProjectResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  startDate?: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  fileDescription?: string;

  @AutoMap()
  slug?: string;

  @AutoMap(() => SiteResponseDto)
  site?: SiteResponseDto;
}

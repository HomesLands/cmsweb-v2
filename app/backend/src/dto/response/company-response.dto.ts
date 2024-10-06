import { AutoMap } from "@automapper/classes";
import { SiteResponseDto } from "@dto/response"
import { BaseResponseDto } from "./base-response.dto";

export class CompanyResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  logo?: string;

  @AutoMap(() => [SiteResponseDto])
  sites?: SiteResponseDto[];
}

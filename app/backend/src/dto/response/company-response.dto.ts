import { AutoMap } from "@automapper/classes";
import { SiteResponseDto } from "@dto/response"

export class CompanyResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  slug?: string;

  @AutoMap(() => [SiteResponseDto])
  sites?: SiteResponseDto[];
}
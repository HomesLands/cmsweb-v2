import { AutoMap } from "@automapper/classes";
import { ProjectResponseDto, DepartmentResponseDto } from "@dto/response";

export class SiteResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  slug?: string;

  @AutoMap(() => [ProjectResponseDto])
  projects?: ProjectResponseDto[];

  @AutoMap(() => [DepartmentResponseDto])
  departments?: DepartmentResponseDto[];

  //note: thiếu department

  company?: string;

  companySlug?: string;
}
import { AutoMap } from "@automapper/classes";
import { ProjectResponseDto, DepartmentResponseDto, BaseResponseDto } from "@dto/response";


export class SiteResponseDto
//  extends BaseResponseDto 
 {
  @AutoMap()
  name?: string;

  @AutoMap()
  slug?: string;

  @AutoMap(() => [ProjectResponseDto])
  projects?: ProjectResponseDto[];

  @AutoMap(() => [DepartmentResponseDto])
  departments?: DepartmentResponseDto[];

  company?: string;

  companySlug?: string;
}

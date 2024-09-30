import { AutoMap } from "@automapper/classes";
import { 
  ProjectResponseDto,
  DepartmentResponseDto, 
  BaseResponseDto,
  CompanyResponseDto
 } from "@dto/response";


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

  @AutoMap(() => CompanyResponseDto)
  company?: CompanyResponseDto;
}

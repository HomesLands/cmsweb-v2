import { AutoMap } from "@automapper/classes";
import { 
  ProjectResponseDto,
  DepartmentResponseDto, 
  CompanyResponseDto
} from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class SiteResponseDto extends BaseResponseDto {
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

import { AutoMap } from "@automapper/classes";
import { BaseResponseDto, SiteResponseDto, UserDepartmentResponseDto } from "@dto/response";

export class DepartmentResponseDto extends BaseResponseDto{
  @AutoMap()
  nameNormalize?: string;

  @AutoMap()
  description?: string;

  @AutoMap(() => SiteResponseDto)
  site?: SiteResponseDto;

  @AutoMap(() => [UserDepartmentResponseDto])
  userDepartments?: UserDepartmentResponseDto[]
}
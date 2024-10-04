import { AutoMap } from "@automapper/classes";
import { SiteResponseDto, UserDepartmentResponseDto } from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

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
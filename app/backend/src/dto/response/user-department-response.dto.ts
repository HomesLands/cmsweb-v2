import { AutoMap } from "@automapper/classes";
import { DepartmentResponseDto, UserResponseDto } from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class UserDepartmentResponseDto extends BaseResponseDto {
  @AutoMap(() => UserResponseDto)
  user?: UserResponseDto;

  @AutoMap(() => DepartmentResponseDto)
  department?: DepartmentResponseDto;
}

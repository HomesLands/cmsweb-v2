import { AutoMap } from "@automapper/classes";
import { DepartmentResponseDto, UserResponseDto } from "@dto/response";

export class UserDepartmentResponseDto {
  @AutoMap(() => UserResponseDto)
  user?: UserResponseDto;

  @AutoMap(() => DepartmentResponseDto)
  department?: DepartmentResponseDto;
}
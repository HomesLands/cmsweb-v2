import { AutoMap } from "@automapper/classes";
import { UserDepartmentResponseDto, BaseResponseDto } from "@dto/response";

export class UserResponseDto 
// extends BaseResponseDto 
{
  @AutoMap()
  fullname?: string;

  @AutoMap()
  username?: string;

  @AutoMap(() => [UserDepartmentResponseDto])
  userDepartments?: UserDepartmentResponseDto[];
}

export class UserPermissionResponseDto 
// extends BaseResponseDto 
{
  @AutoMap()
  role?: string;

  @AutoMap()
  authorities?: string[];
}

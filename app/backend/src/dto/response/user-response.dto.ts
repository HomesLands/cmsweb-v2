import { AutoMap } from "@automapper/classes";
import { UserDepartmentResponseDto } from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class UserResponseDto extends BaseResponseDto {
  @AutoMap()
  fullname?: string;

  @AutoMap()
  username?: string;

  @AutoMap()
  signature?: string;

  @AutoMap()
  avatar?: string;

  @AutoMap(() => [UserDepartmentResponseDto])
  userDepartments?: UserDepartmentResponseDto[];
}

export class UserPermissionResponseDto extends BaseResponseDto {
  @AutoMap()
  role?: string;

  @AutoMap()
  authorities?: string[];
}

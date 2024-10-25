import { AutoMap } from "@automapper/classes";
import {
  PermissionResponseDto,
  UserDepartmentResponseDto,
  UserRoleResponseDto,
} from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class UserResponseDto extends BaseResponseDto {
  @AutoMap()
  fullname?: string;

  @AutoMap()
  username?: string;

  @AutoMap()
  dob?: string;

  @AutoMap()
  email?: string;

  @AutoMap()
  gender?: string;

  @AutoMap()
  address?: string;

  @AutoMap()
  phoneNumber?: string;

  @AutoMap()
  signature?: string;

  @AutoMap()
  avatar?: string;

  @AutoMap(() => [UserDepartmentResponseDto])
  userDepartments?: UserDepartmentResponseDto[];

  @AutoMap(() => [UserRoleResponseDto])
  userRoles?: UserRoleResponseDto[];
}

export class UserPermissionResponseDto extends BaseResponseDto {
  @AutoMap()
  role?: string;

  @AutoMap()
  permissions?: PermissionResponseDto[];
}

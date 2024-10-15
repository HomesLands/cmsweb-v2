import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
} from "@automapper/core";
import {
  UserResponseDto,
  UserDepartmentResponseDto,
  UserRoleResponseDto,
} from "@dto/response";
import { User, UserDepartment, UserRole } from "@entities";

// Define the mapping profile
export const userMapper: MappingProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    User,
    UserResponseDto,
    forMember(
      (destination) => destination.userDepartments,
      mapWith(
        UserDepartmentResponseDto,
        UserDepartment,
        (source) => source.userDepartments
      )
    ),
    forMember(
      (destination) => destination.userRoles,
      mapWith(UserRoleResponseDto, UserRole, (source) => source.userRoles)
    )
  ); // Map entity to response object
};

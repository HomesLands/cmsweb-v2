import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
} from "@automapper/core";
import {
  DepartmentResponseDto,
  UserDepartmentResponseDto,
  UserResponseDto,
} from "@dto/response";
import { CreateUserDepartmentRequestDto } from "@dto/request";
import { Department, UserDepartment, User } from "@entities";

// Define the mapping profile
export const userDepartmentMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    UserDepartment,
    UserDepartmentResponseDto,
    forMember(
      (destination) => destination.user,
      mapWith(UserResponseDto, User, (source) => source.user)
    ),
    forMember(
      (destination) => destination.department,
      mapWith(DepartmentResponseDto, Department, (source) => source.department)
    )
  );

  // Map request object to entity
  createMap(mapper, CreateUserDepartmentRequestDto, UserDepartment);
};

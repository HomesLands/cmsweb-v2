import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  extend,
  mapWith,
} from "@automapper/core";
import { 
  DepartmentResponseDto,
  UserDepartmentResponseDto,
  UserResponseDto,
} from "@dto/response";
import { 
  CreateUserDepartmentRequestDto,
} from "@dto/request";
import { Department, UserDepartment, User } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const userDepartmentMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    UserDepartment,
    UserDepartmentResponseDto,
    forMember(
      (destination) => destination.user,
      mapWith(
        UserResponseDto,
        User,
        (source) => source.user)
    ),
    forMember(
      (destination) => destination.department,
      mapWith(
        DepartmentResponseDto,
        Department,
        (source) => source.department)
    ),
    extend(baseMapper(mapper))
  );

  // Map request object to entity
  createMap(mapper, CreateUserDepartmentRequestDto, UserDepartment);
};

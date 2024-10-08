import {
  MappingProfile,
  Mapper,
  createMap,
  extend,
  forMember,
  mapWith,
} from "@automapper/core";
import { UserResponseDto, UserDepartmentResponseDto } from "@dto/response";
import { User, UserDepartment } from "@entities";
import { baseMapper } from "./base.mapper";

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
    extend(baseMapper(mapper))
  ); // Map entity to response object
};

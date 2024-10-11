import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
} from "@automapper/core";
import { UserResponseDto, UserDepartmentResponseDto } from "@dto/response";
import { User, UserDepartment } from "@entities";

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
    )
  ); // Map entity to response object
};

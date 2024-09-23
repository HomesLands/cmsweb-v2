import {
  MappingProfile,
  Mapper,
  createMap,
  extend,
  forMember,
  mapWith,
} from "@automapper/core";
import { RoleResponseDto, UserRoleResponseDto } from "@dto/response";
import { Role, UserRole } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const userRoleMapper: MappingProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    UserRole,
    UserRoleResponseDto,
    extend(baseMapper(mapper)),
    forMember(
      (destination) => destination.role,
      mapWith(RoleResponseDto, Role, (source) => source.role)
    )
  ); // Map entity to response object
};

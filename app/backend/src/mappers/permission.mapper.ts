import {
  MappingProfile,
  Mapper,
  createMap,
  extend,
  forMember,
  mapWith,
} from "@automapper/core";
import { PermissionResponseDto, RoleResponseDto } from "@dto/response";
import { Permission, Role } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const permissionMapper: MappingProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    Permission,
    PermissionResponseDto,
    extend(baseMapper(mapper)),
    forMember(
      (destination) => destination.role,
      mapWith(RoleResponseDto, Role, (source) => source.role)
    )
  ); // Map entity to response object
};

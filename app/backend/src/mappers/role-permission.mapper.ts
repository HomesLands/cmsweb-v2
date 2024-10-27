import {
  MappingProfile,
  Mapper,
  createMap,
  extend,
  forMember,
  mapWith,
} from "@automapper/core";
import { RolePermissionResponseDto, RoleResponseDto } from "@dto/response";
import { Role, RolePermission } from "@entities";
import { baseMapper } from "./base.mapper";
import { CreateRolePermissionRequestDto } from "@dto/request";

// Define the mapping profile
export const rolePermissionMapper: MappingProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    RolePermission,
    RolePermissionResponseDto,
    extend(baseMapper(mapper)),
    forMember(
      (destination) => destination.role,
      mapWith(RoleResponseDto, Role, (source) => source.role)
    )
  ); // Map entity to response object

  createMap(mapper, CreateRolePermissionRequestDto, RolePermission);
};

import {
  MappingProfile,
  Mapper,
  createMap,
  extend,
  forMember,
  mapFrom,
} from "@automapper/core";
import { RolePermissionResponseDto } from "@dto/response";
import { RolePermission } from "@entities";
import { baseMapper } from "./base.mapper";
import { CreateRolePermissionRequestDto } from "@dto/request";

// Define the mapping profile
export const rolePermissionMapper: MappingProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    RolePermission,
    RolePermissionResponseDto,
    extend(baseMapper(mapper))
  ); // Map entity to response object

  createMap(mapper, CreateRolePermissionRequestDto, RolePermission);
};

import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapFrom,
  mapWith,
} from "@automapper/core";
import { RolePermissionResponseDto, RoleResponseDto } from "@dto/response";
import { Role, RolePermission } from "@entities";
import { CreateRoleRequestDto } from "@dto/request";

// Define the mapping profile
export const roleMapper: MappingProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    Role,
    RoleResponseDto,
    forMember(
      (d) => d.rolePermissions,
      mapWith(
        RolePermissionResponseDto,
        RolePermission,
        (s) => s.rolePermissions
      )
    )
  ); // Map entity to response object
  createMap(
    mapper,
    CreateRoleRequestDto,
    Role,
    forMember(
      (destination) => destination.nameNormalize,
      mapFrom((source) => source.nameNormalize?.toUpperCase())
    )
  ); // Map entity to response object
};

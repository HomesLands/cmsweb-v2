import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapFrom,
} from "@automapper/core";
import { CreatePermissionRequestDto } from "@dto/request";
import { PermissionResponseDto } from "@dto/response";
import { Permission } from "@entities";

// Define the mapping profile
export const permissionMapper: MappingProfile = (mapper: Mapper) => {
  createMap(mapper, CreatePermissionRequestDto, Permission);

  createMap(
    mapper,
    Permission,
    PermissionResponseDto,
    forMember(
      (destination) => destination.authority,
      mapFrom((source) => source.authority?.nameNormalize)
    ),
    forMember(
      (destination) => destination.resource,
      mapFrom((source) => source.resource?.name)
    )
  ); // Map entity to response object
};

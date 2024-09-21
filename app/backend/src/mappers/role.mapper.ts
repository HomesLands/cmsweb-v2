import { MappingProfile, Mapper, createMap, extend } from "@automapper/core";
import { RoleResponseDto } from "@dto/response";
import { Role } from "@entities";
import { baseMapper } from "./base.mapper";
import { CreateRoleRequestDto } from "@dto/request";

// Define the mapping profile
export const roleMapper: MappingProfile = (mapper: Mapper) => {
  createMap(mapper, Role, RoleResponseDto, extend(baseMapper(mapper))); // Map entity to response object
  createMap(mapper, CreateRoleRequestDto, Role, extend(baseMapper(mapper))); // Map entity to response object
};

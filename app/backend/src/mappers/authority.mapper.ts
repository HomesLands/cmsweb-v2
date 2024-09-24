import { MappingProfile, Mapper, createMap, extend } from "@automapper/core";
import { AuthorityResponseDto } from "@dto/response";
import { Authority } from "@entities";
import { baseMapper } from "./base.mapper";
import { CreateAuthorityRequestDto } from "@dto/request";

// Define the mapping profile
export const authorityMapper: MappingProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    Authority,
    AuthorityResponseDto,
    extend(baseMapper(mapper))
  ); // Map entity to response object
  createMap(
    mapper,
    CreateAuthorityRequestDto,
    Authority,
    extend(baseMapper(mapper))
  ); // Map entity to response object
};

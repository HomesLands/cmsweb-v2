import {
  MappingProfile,
  Mapper,
  createMap,
  extend,
  forMember,
  mapFrom,
} from "@automapper/core";
import { ResourceResponseDto } from "@dto/response";
import { baseMapper } from "./base.mapper";
import { Resource } from "@entities";
import { CreateResourceRequestDto } from "@dto/request";

// Define the mapping profile
export const resourceMapper: MappingProfile = (mapper: Mapper) => {
  createMap(mapper, Resource, ResourceResponseDto, extend(baseMapper(mapper))); // Map entity to response object
  createMap(
    mapper,
    CreateResourceRequestDto,
    Resource,
    forMember(
      (destination) => destination.name,
      mapFrom((source) => source.name?.toLocaleLowerCase().replace(" ", "-"))
    )
  ); // Map entity to response object
};

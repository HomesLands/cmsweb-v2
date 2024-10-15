import { MappingProfile, Mapper, createMap, extend, forMember, mapFrom } from "@automapper/core";
import { UnitResponseDto } from "@dto/response";
import { CreateUnitRequestDto } from "@dto/request";
import { Unit } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const unitMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(mapper, Unit, UnitResponseDto, extend(baseMapper(mapper)));

  // Map request object to entity
  createMap(
    mapper, 
    CreateUnitRequestDto, 
    Unit,
    forMember(
      (destination) => destination.name,
      mapFrom(
        (source) => source.name?.toLocaleLowerCase()
      )
    )
  );
};

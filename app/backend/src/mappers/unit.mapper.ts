import { MappingProfile, Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { UnitResponseDto } from "@dto/response";
import { CreateUnitRequestDto } from "@dto/request";
import { Unit } from "@entities";

// Define the mapping profile
export const unitMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(mapper, Unit, UnitResponseDto);

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

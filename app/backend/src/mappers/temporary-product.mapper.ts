import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  extend,
  mapWith,
} from "@automapper/core";
import { 
  TemporaryProductResponseDto,
  UnitResponseDto
} from "@dto/response";
import { CreateTemporaryProductRequestDto } from "@dto/request";
import { TemporaryProduct, Unit } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const temporaryProductMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    TemporaryProduct,
    TemporaryProductResponseDto,
    forMember(
      (destination) => destination.unit,
      mapWith(
        UnitResponseDto,
        Unit,
        (source) => source.unit
      )
    ),
    extend(baseMapper(mapper))
  );

  // Map request object to entity
  createMap(
    mapper, 
    CreateTemporaryProductRequestDto, 
    TemporaryProduct
  );
};

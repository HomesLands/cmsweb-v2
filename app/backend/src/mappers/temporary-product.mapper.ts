import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
} from "@automapper/core";
import { TemporaryProductResponseDto, UnitResponseDto } from "@dto/response";
import { CreateTemporaryProductRequestDto } from "@dto/request";
import { TemporaryProduct, Unit } from "@entities";

// Define the mapping profile
export const temporaryProductMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    TemporaryProduct,
    TemporaryProductResponseDto,
    forMember(
      (destination) => destination.unit,
      mapWith(UnitResponseDto, Unit, (source) => source.unit)
    )
  );

  // Map request object to entity
  createMap(mapper, CreateTemporaryProductRequestDto, TemporaryProduct);
};

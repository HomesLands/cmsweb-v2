import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
  extend,
} from "@automapper/core";
import {
  ProductResponseDto,
  RequestProductResponseDto,
  TemporaryProductResponseDto,
} from "@dto/response";
import {
  Product,
  RequestProduct,
  TemporaryProduct,
} from "@entities";
import { 
  CreateRequestProductRequestDto, 
} from "@dto/request";
import { baseMapper } from "./base.mapper";

export const requestProductMapper: MappingProfile = (mapper: Mapper) =>{
  
  // Map request object to entity
  createMap(
    mapper,
    CreateRequestProductRequestDto,
    RequestProduct,
  );

  // Map entity to response object
  createMap(
    mapper,
    RequestProduct,
    RequestProductResponseDto,
    forMember(
      (destination) => destination.product,
      mapWith(
        ProductResponseDto,
        Product,
        (source) => source.product)
    ),
    forMember(
      (destination) => destination.temporaryProduct,
      mapWith(
        TemporaryProductResponseDto,
        TemporaryProduct,
        (source) => source.temporaryProduct)
    ),
    extend(baseMapper(mapper)),
  );
}
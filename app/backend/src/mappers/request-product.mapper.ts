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
  RequestProductResponseDto
} from "@dto/response";
import {
  Product,
  RequestProduct
} from "@entities";
import { CreateRequestProductRequestDto } from "@dto/request";
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
    extend(baseMapper(mapper)),
  );
}
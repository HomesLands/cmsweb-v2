import {
  MappingProfile,
  Mapper,
  createMap,
  extend,
} from "@automapper/core";
import { ProductResponseDto } from "@dto/response";
import {
  CreateProductRequestDto,
} from "@dto/request";
import { Product } from "@entities";
import { baseMapper } from "./base.mapper";

export const productMapper: MappingProfile = (mapper: Mapper) => {
  // Map request object to entity
  createMap(mapper, CreateProductRequestDto, Product);
  
  //Map entity to response object
  createMap(
    mapper,
    Product,
    ProductResponseDto,
    extend(baseMapper(mapper))
  );
};

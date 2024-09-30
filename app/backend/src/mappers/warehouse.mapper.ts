import {
  MappingProfile,
  Mapper,
  createMap,
  extend,
  forMember,
  mapWith,
} from "@automapper/core";
import { 
  WarehouseResponseDto, 
  ProductWarehouseResponseDto
} from "@dto/response";
import { 
  CreateWarehouseRequestDto, 
} from "@dto/request";
import { Warehouse, ProductWarehouse } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const warehouseMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    Warehouse,
    WarehouseResponseDto,
    forMember(
      (destination) => destination.productWarehouses,
      mapWith(
        ProductWarehouseResponseDto,
        ProductWarehouse,
        (source) => source.productWarehouses)
    ),
    extend(baseMapper(mapper))
  );

  // Map request object to entity
  createMap(mapper, CreateWarehouseRequestDto, Warehouse);
};

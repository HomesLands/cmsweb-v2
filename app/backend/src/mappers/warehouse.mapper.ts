import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
} from "@automapper/core";
import {
  WarehouseResponseDto,
  ProductWarehouseResponseDto,
} from "@dto/response";
import { CreateWarehouseRequestDto } from "@dto/request";
import { Warehouse, ProductWarehouse } from "@entities";

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
        (source) => source.productWarehouses
      )
    )
  );

  // Map request object to entity
  createMap(mapper, CreateWarehouseRequestDto, Warehouse);
};

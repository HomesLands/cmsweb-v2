import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
  extend,
} from "@automapper/core";
import { 
  CreatePurchaseProductWithoutRequisitionFormRequestDto,
  CreatePurchaseProductFromRequisitionFormRequestDto,
 } from "@dto/request";
import {
  PurchaseProductResponseDto,
  ProductResponseDto,
  TemporaryProductResponseDto,
} from "@dto/response";
import { 
  PurchaseProduct,
  Product,
  TemporaryProduct 
} from "@entities";
import { baseMapper } from "./base.mapper";

export const purchaseProductMapper: MappingProfile = (mapper: Mapper) =>{
  // Map request object to entity
  createMap(
    mapper,
    CreatePurchaseProductWithoutRequisitionFormRequestDto,
    PurchaseProduct,
  );
  createMap(
    mapper,
    CreatePurchaseProductFromRequisitionFormRequestDto,
    PurchaseProduct,
  );

  // Map entity to response object
  createMap(
    mapper,
    PurchaseProduct,
    PurchaseProductResponseDto,
    forMember(
      (destination) => destination.product,
      mapWith(
        ProductResponseDto,
        Product,
        (source) => source.product
      )
    ),
    forMember(
      (destination) => destination.temporaryProduct,
      mapWith(
        TemporaryProductResponseDto,
        TemporaryProduct,
        (source) => source.temporaryProduct
      )
    ),
    extend(baseMapper(mapper))
  );
}
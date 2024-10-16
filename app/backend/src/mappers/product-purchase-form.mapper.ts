import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
  extend,
} from "@automapper/core";
import {
  ProductPurchaseForm,
  PurchaseProduct,
  ProductRequisitionForm
} from "@entities";
import { 
  CreateProductPurchaseFormFromProductRequisitionFormRequestDto,
  CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto,
 } from "@dto/request";
import {
  PurchaseProductResponseDto,
  ProductRequisitionFormResponseDto,
  ProductPurchaseFormResponseDto,
} from "@dto/response";
import { baseMapper } from "./base.mapper";

export const productPurchaseFormMapper: MappingProfile = (
  mapper: Mapper
) => {
  // Map request object to entity
  createMap(
    mapper,
    CreateProductPurchaseFormFromProductRequisitionFormRequestDto,
    ProductPurchaseForm,
  );
  createMap(
    mapper,
    CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto,
    ProductPurchaseForm,
  );

  // Map entity to response object
  createMap(
    mapper,
    ProductPurchaseForm,
    ProductPurchaseFormResponseDto,
    forMember(
      (destination) => destination.purchaseProduct,
      mapWith(
        PurchaseProductResponseDto,
        PurchaseProduct,
        (source) => source.purchaseProducts
      )
    ),
    forMember(
      (destination) => destination.productRequisitionForm,
      mapWith(
        ProductRequisitionFormResponseDto,
        ProductRequisitionForm,
        (source) => source.productRequisitionForm
      )
    ),
    extend(baseMapper(mapper))
  )
}

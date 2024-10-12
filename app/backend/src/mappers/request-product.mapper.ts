import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
  mapFrom,
} from "@automapper/core";
import {
  ProductResponseDto,
  RequestProductResponseDto,
  TemporaryProductResponseDto,
  ExportRequestProductResponseDto,
} from "@dto/response";
import { Product, RequestProduct, TemporaryProduct } from "@entities";
import { CreateRequestProductRequestDto } from "@dto/request";

export const requestProductMapper: MappingProfile = (mapper: Mapper) => {
  // Map request object to entity
  createMap(mapper, CreateRequestProductRequestDto, RequestProduct);

  // Map entity to response object
  createMap(
    mapper,
    RequestProduct,
    RequestProductResponseDto,
    forMember(
      (destination) => destination.product,
      mapWith(ProductResponseDto, Product, (source) => source.product)
    ),
    forMember(
      (destination) => destination.temporaryProduct,
      mapWith(
        TemporaryProductResponseDto,
        TemporaryProduct,
        (source) => source.temporaryProduct
      )
    )
  );

  createMap(
    mapper,
    RequestProduct,
    ExportRequestProductResponseDto,
    forMember(
      (destination) => destination.name,
      mapFrom((source) =>
        source.isExistProduct
          ? source.product?.name
          : source.temporaryProduct?.name
      )
    ),
    forMember(
      (destination) => destination.description,
      mapFrom((source) =>
        source.isExistProduct
          ? source.product?.description
          : source.temporaryProduct?.description
      )
    ),
    forMember(
      (destination) => destination.provider,
      mapFrom((source) =>
        source.isExistProduct
          ? source.product?.provider
          : source.temporaryProduct?.provider
      )
    ),
    forMember(
      (destination) => destination.unit,
      mapFrom((source) => {
        const unit = source.isExistProduct
          ? source.product?.unit?.name
          : source.temporaryProduct?.unit?.name;
        return unit || "N/A";
      })
    )
  );
};

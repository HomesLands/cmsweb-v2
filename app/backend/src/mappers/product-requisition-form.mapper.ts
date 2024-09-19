import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapFrom,
  mapWith 
} from "@automapper/core";
import {
  ProductRequisitionFormResponseDto,
  UserApprovalResponseDto,
  RequestProductResponseDto,
} from "@dto/response";
import {
  ProductRequisitionForm,
  UserApproval,
  RequestProduct,
} from "@entities";
import { CreateProductRequisitionFormRequestDto } from "@dto/request";

export const productRequisitionFormMapper: MappingProfile = (mapper: Mapper) =>{
  // Map entity to response object
  createMap(
    mapper,
    ProductRequisitionForm,
    ProductRequisitionFormResponseDto,
    forMember(
      (destination) => destination.company,
      mapFrom((source) => source.company?.name) 
    ),
    forMember(
      (destination) => destination.companySlug,
      mapFrom((source) => source.company?.slug) 
    ),
    forMember(
      (destination) => destination.userApprovals,
      mapWith(
        UserApprovalResponseDto,
        UserApproval,
        (source) => source.userApprovals)
    ),
    forMember(
      (destination) => destination.requestProducts,
      mapWith(
        RequestProductResponseDto,
        RequestProduct,
        (source) => source.requestProducts)
    )
  );

  // Map request object to entity
  createMap(
    mapper,
    CreateProductRequisitionFormRequestDto,
    ProductRequisitionForm,
  )
}
import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapFrom,
  mapWith,
  extend,
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
import { baseMapper } from "./base.mapper";

export const productRequisitionFormMapper: MappingProfile = (
  mapper: Mapper
) => {
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
      (destination) => destination.site,
      mapFrom((source) => source.site?.name)
    ),
    forMember(
      (destination) => destination.siteSlug,
      mapFrom((source) => source.site?.slug)
    ),
    forMember(
      (destination) => destination.project,
      mapFrom((source) => source.project?.name)
    ),
    forMember(
      (destination) => destination.projectSlug,
      mapFrom((source) => source.project?.slug)
    ),
    forMember(
      (destination) => destination.projectSlug,
      mapFrom((source) => source.project?.slug)
    ),
    forMember(
      (destination) => destination.creator,
      mapFrom((source) => source.creator?.fullname)
    ),
    forMember(
      (destination) => destination.creatorSlug,
      mapFrom((source) => source.creator?.slug)
    ),
    forMember(
      (destination) => destination.userApprovals,
      mapWith(
        UserApprovalResponseDto,
        UserApproval,
        (source) => source.userApprovals
      )
    ),
    forMember(
      (destination) => destination.requestProducts,
      mapWith(
        RequestProductResponseDto,
        RequestProduct,
        (source) => source.requestProducts
      )
    ),
    extend(baseMapper(mapper))
  );

  // Map request object to entity
  createMap(
    mapper,
    CreateProductRequisitionFormRequestDto,
    ProductRequisitionForm
  );
};

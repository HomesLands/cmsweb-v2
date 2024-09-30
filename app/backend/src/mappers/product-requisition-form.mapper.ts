import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapFrom,
  mapWith, 
  extend,
  typeConverter
} from "@automapper/core";
import moment from "moment";
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
      (destination) => destination.project,
      mapFrom((source) => source.project?.name)
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
    typeConverter(
      Date, String, (deadlineApproval) => moment(deadlineApproval).toString()
    ),
    extend(baseMapper(mapper)),
  );

  // Map request object to entity
  createMap(
    mapper,
    CreateProductRequisitionFormRequestDto,
    ProductRequisitionForm,
    forMember(
      (destination) => destination.deadlineApproval,
      mapFrom((source) => moment(source.deadlineApproval).toDate())
    )
  )
}

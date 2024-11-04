import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapFrom,
  mapWith,
  typeConverter,
} from "@automapper/core";
import moment from "moment";
import {
  ProductRequisitionFormResponseDto,
  UserApprovalResponseDto,
  RequestProductResponseDto,
  UserResponseDto,
  ProjectResponseDto,
} from "@dto/response";
import {
  ProductRequisitionForm,
  UserApproval,
  RequestProduct,
  User,
  Project,
} from "@entities";
import { CreateProductRequisitionFormRequestDto } from "@dto/request";

export const productRequisitionFormMapper: MappingProfile = (
  mapper: Mapper
) => {
  // Map entity to response object
  createMap(
    mapper,
    ProductRequisitionForm,
    ProductRequisitionFormResponseDto,
    // forMember(
    //   (destination) => destination.project,
    //   mapWith(ProjectResponseDto, Project, (source) => source.project)
    // ),
    forMember(
      (destination) => destination.creator,
      mapWith(UserResponseDto, User, (source) => source.creator)
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
    typeConverter(Date, String, (deadlineApproval) =>
      moment(deadlineApproval).toString()
    )
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
  );
};

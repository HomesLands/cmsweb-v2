import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith, 
  mapFrom
} from "@automapper/core";
import {
  ApprovalLogResponseDto,
  UserApprovalResponseDto,
  UserApprovalForApprovalUserResponseDto,
  ProductRequisitionFormResponseDto,
} from "@dto/response";
import {
  ApprovalLog,
  UserApproval,
  ProductRequisitionForm,
} from "@entities";
import { CreateUserApprovalRequestDto } from "@dto/request";

export const userApprovalMapper: MappingProfile = (mapper: Mapper) =>{
  // Map entity to response object
  createMap(
    mapper,
    UserApproval,
    UserApprovalResponseDto,
    forMember(
      (destination) => destination.userFullname,
      mapFrom(
        (source) => source.user?.fullname
      )
    ),
    forMember(
      (destination) => destination.userSlug,
      mapFrom(
        (source) => source.user?.slug
      )
    ),
    forMember(
      (destination) => destination.approvalLogs,
      mapWith(
        ApprovalLogResponseDto,
        ApprovalLog,
        (source) => source.approvalLogs
      )
    ),
  );

  // Map entity to response object for approval user
  createMap(
    mapper,
    UserApproval,
    UserApprovalForApprovalUserResponseDto,
    forMember(
      (destination) => destination.approvalUserSlug,
      mapFrom((source) => source.slug)
    ),
    forMember(
      (destination) => destination.productRequisitionForm,
      mapWith(
        ProductRequisitionFormResponseDto,
        ProductRequisitionForm,
        (source) => source.productRequisitionForm
      )
    ),
  );

  // Map request object to entity
  createMap(
    mapper,
    CreateUserApprovalRequestDto, 
    UserApproval,
  )
}
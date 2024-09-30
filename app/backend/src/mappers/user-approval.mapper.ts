import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
  mapFrom,
  extend,
} from "@automapper/core";
import {
  ApprovalLogResponseDto,
  UserApprovalResponseDto,
  ProductRequisitionFormResponseDto,
  UserApprovalFormResponseDto,
  AssignedUserApprovalResponseDto,
} from "@dto/response";
import { 
  ApprovalLog,
  UserApproval,
  ProductRequisitionForm,
  AssignedUserApproval,
} from "@entities";
import { baseMapper } from "./base.mapper";

export const userApprovalMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    UserApproval,
    UserApprovalResponseDto,
    forMember(
      (destination) => destination.userFullname,
      mapFrom((source) => source.assignedUserApproval?.user?.fullname)
    ),
    forMember(
      (destination) => destination.userSlug,
      mapFrom((source) => source.assignedUserApproval?.user?.slug)
    ),
    forMember(
      (destination) => destination.approvalLogs,
      mapWith(
        ApprovalLogResponseDto,
        ApprovalLog,
        (source) => source.approvalLogs
      )
    ),
    forMember(
      (destination) => destination.assignedUserApproval,
      mapWith(
        AssignedUserApprovalResponseDto,
        AssignedUserApproval,
        (source) => source.assignedUserApproval
      )
    ),
    extend(baseMapper(mapper))
  );

  // Map entity to response object for approval user
  createMap(
    mapper,
    UserApproval,
    UserApprovalFormResponseDto,
    forMember(
      (destination) => destination.approvalUserSlug,
      mapFrom((source) => source.slug)
    ),
    forMember(
      (destination) => destination.roleApproval,
      mapFrom((source) => source.assignedUserApproval?.roleApproval)
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
  );

  // Map request object to entity
  // createMap(mapper, CreateUserApprovalRequestDto, UserApproval);
};

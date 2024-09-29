import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  extend,
  mapWith,
} from "@automapper/core";
import {
  AssignedUserApprovalResponseDto,
  UserResponseDto,
  UserApprovalResponseDto,
} from "@dto/response";
import { CreateAssignedUserApprovalRequestDto } from "@dto/request";
import { User, UserApproval, AssignedUserApproval } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const assignedUserApprovalMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    AssignedUserApproval,
    AssignedUserApprovalResponseDto,
    forMember(
      (destination) => destination.user,
      mapWith(
        UserResponseDto,
        User,
        (source) => source.user)
    ),
    forMember(
      (destination) => destination.userApprovals,
      mapWith(
        UserApprovalResponseDto,
        UserApproval,
        (source) => source.userApprovals)
    ),
    extend(baseMapper(mapper))
  );

  // Map request object to entity
  createMap(mapper, CreateAssignedUserApprovalRequestDto, AssignedUserApproval);
};

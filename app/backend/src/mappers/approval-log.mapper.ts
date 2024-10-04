import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapFrom,
  extend,
} from "@automapper/core";
import {
  ApprovalLogResponseDto,
} from "@dto/response";
import { CreateApprovalLogRequestDto } from "@dto/request";
import {
  ApprovalLog,
} from "@entities";
import moment from "moment";
import { baseMapper } from "./base.mapper";

export const approvalLogMapper: MappingProfile = (mapper: Mapper) =>{
  // Map entity to response object
  createMap(
    mapper,
    ApprovalLog,
    ApprovalLogResponseDto,
    forMember(
      (destination) => destination.createdAt,
      mapFrom(
        (source) => moment(source.createdAt).toISOString()
      )
    ),
    extend(baseMapper(mapper)),
  );

  // Map request object to entity
  createMap(
    mapper,
    CreateApprovalLogRequestDto,
    ApprovalLog,
    // forMember(
    //   (destination) => destination.content,
    //   mapFrom(
    //     (source) => source.approvalLogContent
    //   )
    // ),
    // forMember(
    //   (destination) => destination.status,
    //   mapFrom(
    //     (source) => source.approvalLogStatus
    //   )
    // )
  );
}

import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapFrom,
} from "@automapper/core";
import {
  ApprovalLogResponseDto,
} from "@dto/response";
import {
  ApprovalLog,
} from "@entities";
import moment from "moment";

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
    )
  )
}

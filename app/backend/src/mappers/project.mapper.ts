import {
  MappingProfile,
  Mapper,
  createMap,
  mapFrom,
  forMember,
  mapWith,
  typeConverter,
} from "@automapper/core";
import { ProjectResponseDto, SiteResponseDto } from "@dto/response";
import { CreateProjectRequestDto } from "@dto/request";
import { Project, Site } from "@entities";
import moment from "moment";

// Define the mapping profile
export const projectMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    Project,
    ProjectResponseDto,
    forMember(
      (destination) => destination.site,
      mapWith(SiteResponseDto, Site, (source) => source.site)
    ),
    typeConverter(Date, String, (startDate) => moment(startDate).toString())
  );

  // Map request object to entity
  createMap(
    mapper,
    CreateProjectRequestDto,
    Project,
    forMember(
      (destination) => destination.startDate,
      mapFrom((source) => moment(source.startDate).toDate())
    )
  );
};

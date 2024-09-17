import { MappingProfile, Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { SiteResponseDto } from "@dto/response";
import { CreateSiteRequestDto } from "@dto/request";
import { Site } from "@entities";

// Define the mapping profile
export const siteMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    Site,
    SiteResponseDto,
    forMember(
      (destination) => destination.managerFullname,
      mapFrom((source) => source.manager?.fullname)
    ),
    forMember(
      (destination) => destination.mangerSlug,
      mapFrom((source) => source.manager?.slug)
    ),
  );

  // Map request object to entity
  createMap(
    mapper,
    CreateSiteRequestDto,
    Site,
  )
};

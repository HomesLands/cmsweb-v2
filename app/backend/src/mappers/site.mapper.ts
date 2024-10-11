import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
} from "@automapper/core";
import {
  SiteResponseDto,
  ProjectResponseDto,
  DepartmentResponseDto,
  CompanyResponseDto,
} from "@dto/response";
import { CreateSiteRequestDto } from "@dto/request";
import { Project, Site, Department, Company } from "@entities";

// Define the mapping profile
export const siteMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    Site,
    SiteResponseDto,
    forMember(
      (destination) => destination.company,
      mapWith(CompanyResponseDto, Company, (source) => source.company)
    ),
    forMember(
      (destination) => destination.projects,
      mapWith(ProjectResponseDto, Project, (source) => source.projects)
    ),
    forMember(
      (destination) => destination.departments,
      mapWith(DepartmentResponseDto, Department, (source) => source.departments)
    )
  );

  // Map request object to entity
  createMap(mapper, CreateSiteRequestDto, Site);
};

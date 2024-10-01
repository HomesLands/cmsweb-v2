import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapFrom,
  extend,
  mapWith,
} from "@automapper/core";
import { 
  SiteResponseDto, 
  ProjectResponseDto, 
  DepartmentResponseDto,
  CompanyResponseDto 
} from "@dto/response";
import { CreateSiteRequestDto } from "@dto/request";
import { Project, Site, Department, Company } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const siteMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    Site,
    SiteResponseDto,
    forMember(
      (destination) => destination.company,
      mapWith(
        CompanyResponseDto,
        Company,
        (source) => source.company)
    ),
    forMember(
      (destination) => destination.projects,
      mapWith(
        ProjectResponseDto,
        Project,
        (source) => source.projects)
    ),
    forMember(
      (destination) => destination.departments,
      mapWith(
        DepartmentResponseDto,
        Department,
        (source) => source.departments)
    ),
    extend(baseMapper(mapper))
  );

  // Map request object to entity
  createMap(mapper, CreateSiteRequestDto, Site);
};

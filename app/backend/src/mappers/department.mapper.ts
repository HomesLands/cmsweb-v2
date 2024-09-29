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
  DepartmentResponseDto,
  SiteResponseDto,
  UserDepartmentResponseDto 
} from "@dto/response";
import { 
  CreateDepartmentRequestDto,  
} from "@dto/request";
import { Department, Site, UserDepartment } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const departmentMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    Department,
    DepartmentResponseDto,
    forMember(
      (destination) => destination.userDepartments,
      mapWith(
        UserDepartmentResponseDto,
        UserDepartment,
        (source) => source.userDepartments)
    ),
    forMember(
      (destination) => destination.site,
      mapWith(
        SiteResponseDto,
        Site,
        (source) => source.site)
    ),
    extend(baseMapper(mapper))
  );

  // Map request object to entity
  createMap(mapper, CreateDepartmentRequestDto, Department);
};

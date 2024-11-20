import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  mapWith,
  mapFrom,
} from "@automapper/core";
import {
  DepartmentResponseDto,
  SiteResponseDto,
  UserDepartmentResponseDto,
} from "@dto/response";
import {
  CreateDepartmentRequestDto,
  UpdateDepartmentRequestDto,
} from "@dto/request";
import { Department, Site, UserDepartment } from "@entities";

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
        (source) => source.userDepartments
      )
    ),
    forMember(
      (destination) => destination.site,
      mapWith(SiteResponseDto, Site, (source) => source.site)
    ),
    forMember(
      (d) => d.nameNormalize,
      mapFrom((s) => s.nameNormalize?.replace("_DEPARTMENT", ""))
    )
  );

  // Map request object to entity
  createMap(
    mapper,
    CreateDepartmentRequestDto,
    Department,
    forMember(
      (destination) => destination.nameNormalize,
      mapFrom((source) =>
        source.nameNormalize
          ?.replace(" ", "_")
          ?.concat("_DEPARTMENT")
          ?.toUpperCase()
      )
    )
  );

  createMap(
    mapper,
    UpdateDepartmentRequestDto,
    UpdateDepartmentRequestDto,
    forMember(
      (destination) => destination.nameNormalize,
      mapFrom((source) => {
        return source.nameNormalize
          ?.replace(" ", "_")
          ?.concat("_DEPARTMENT")
          ?.toUpperCase();
      })
    )
  );
};

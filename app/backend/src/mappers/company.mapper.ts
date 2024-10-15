import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  extend,
  mapWith,
} from "@automapper/core";
import { CreateCompanyRequestDto } from "@dto/request";
import { CompanyResponseDto, SiteResponseDto } from "@dto/response";
import { Company, Site } from "@entities";
import { baseMapper } from "./base.mapper";

export const companyMapper: MappingProfile = (mapper: Mapper) => {
  // Map request object to entity
  createMap(mapper, CreateCompanyRequestDto, Company);

  // Map entity to response object
  createMap(
    mapper,
    Company,
    CompanyResponseDto,
    forMember(
      (destination) => destination.sites,
      mapWith(SiteResponseDto, Site, (source) => source.sites)
    ),
    extend(baseMapper(mapper))
  );
};

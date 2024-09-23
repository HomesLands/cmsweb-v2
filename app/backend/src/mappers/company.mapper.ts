import { MappingProfile, Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { CreateCompanyRequestDto } from "@dto/request";
import { CompanyResponseDto } from "@dto/response";
import { Company } from "@entities";

export const companyMapper: MappingProfile = (mapper: Mapper) => {
  // Map request object to entity
  createMap(
    mapper,
    CreateCompanyRequestDto,
    Company,
  );

  // Map entity to response object
  createMap(
    mapper,
    Company,
    CompanyResponseDto,
    forMember(
      (destination) => destination.director,
      mapFrom((source) => source.director?.fullname)
    ),
    forMember(
      (destination) => destination.directorSlug,
      mapFrom((source) => source.director?.slug)
    ),
  )
}
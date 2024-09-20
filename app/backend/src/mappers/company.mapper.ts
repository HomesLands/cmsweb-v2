import { MappingProfile, Mapper, createMapper, createMap } from "@automapper/core";
import { CreateCompanyRequestDto } from "@dto/request";
import { CompanyResponseDto } from "@dto/response";
import { Company } from "@entities";
import { mapper } from ".";

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
  )
}
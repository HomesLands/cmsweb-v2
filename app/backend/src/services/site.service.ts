import { siteRepository, companyRepository } from "@repositories";
import { mapper } from "@mappers";
import { plainToClass } from "class-transformer";

import { Site } from "@entities/site.entity";
import { SiteResponseDto } from "@dto/response";
import { CreateSiteRequestDto } from "@dto/request";
import { TCreateSiteRequestDto } from "@types";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";
import { validate } from "class-validator";

class SiteService {
  public async getAllSites(): Promise<SiteResponseDto[] | []> {
    const sitesData = await siteRepository.find({
      relations: [
        'departments',
        'company',
        'projects',
      ]
    });

    const sitesDto: SiteResponseDto[] = mapper.mapArray(
      sitesData,
      Site,
      SiteResponseDto
    );
    return sitesDto;
  }

  public async createSite(plainData: TCreateSiteRequestDto): Promise<SiteResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(CreateSiteRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const company = await companyRepository.findOneBy({ slug: requestData.company });
    if(!company) throw new GlobalError(ErrorCodes.COMPANY_NOT_FOUND);

    const siteData = mapper.map(requestData, CreateSiteRequestDto, Site);
    siteData.company = company;

    const dataSiteCreated = await siteRepository.createAndSave(siteData);
    
    return mapper.map(dataSiteCreated, Site, SiteResponseDto);
  }
}

export default new SiteService();
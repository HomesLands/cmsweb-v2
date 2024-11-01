import { siteRepository, companyRepository } from "@repositories";
import { mapper } from "@mappers";
import { plainToClass } from "class-transformer";

import { Site } from "@entities/site.entity";
import { SiteResponseDto } from "@dto/response";
import { CreateSiteRequestDto, UpdateSiteRequestDto } from "@dto/request";
import { TCreateSiteRequestDto, TUpdateSiteRequestDto } from "@types";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";
import { validate } from "class-validator";

class SiteService {
  public async getAllSites(): Promise<SiteResponseDto[] | []> {
    const sitesData = await siteRepository.find({
      relations: ["departments", "company", "projects"],
    });

    const sitesDto: SiteResponseDto[] = mapper.mapArray(
      sitesData,
      Site,
      SiteResponseDto
    );
    return sitesDto;
  }

  public async createSite(
    plainData: TCreateSiteRequestDto
  ): Promise<SiteResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(CreateSiteRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const company = await companyRepository.findOneBy({
      slug: requestData.company,
    });
    if (!company) throw new GlobalError(ErrorCodes.COMPANY_NOT_FOUND);

    const siteData = mapper.map(requestData, CreateSiteRequestDto, Site);
    siteData.company = company;

    const dataSiteCreated = await siteRepository.createAndSave(siteData);

    return mapper.map(dataSiteCreated, Site, SiteResponseDto);
  }

  public async updateSite(
    plainData: TUpdateSiteRequestDto
  ): Promise<SiteResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(UpdateSiteRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const site = await siteRepository.findOneBy({
      slug: requestData.slug,
    });
    if (!site) throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);

    const company = await companyRepository.findOne({
      where: { slug: requestData.company },
    });
    if (!company) throw new GlobalError(ErrorCodes.COMPANY_NOT_FOUND);

    Object.assign(site, { name: requestData.name, company });
    const updated = await siteRepository.save(site);

    return mapper.map(updated, Site, SiteResponseDto);
  }

  public async deleteSite(slug: string): Promise<number> {
    const site = await siteRepository.findOneBy({
      slug,
    });
    if (!site) throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);

    const deleted = await siteRepository.softDelete({ slug });
    return deleted.affected || 0;
  }
}

export default new SiteService();

import { siteRepository, userRepository } from "@repositories";
import { mapper } from "@mappers";
import { plainToClass } from "class-transformer";

import { Site } from "@entities/site.entity";
import { SiteResponseDto } from "@dto/response";
import { CreateSiteRequestDto } from "@dto/request";
import { TCreateSiteRequestDto } from "@types";
import { GlobalError, ErrorCodes } from "@exception";

class SiteService {
  public async getAllSites(): Promise<SiteResponseDto[] | []> {
    const sitesData = await siteRepository.findAllSite();
    if(sitesData.length < 1) {
      return [];
    }
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

    const manager = await userRepository.findOneBy({ id: requestData.manager });

    if (!manager) {
      throw new GlobalError(ErrorCodes.USER_ASSIGNED_NOT_FOUND);
    }

    const siteData = mapper.map(requestData, CreateSiteRequestDto, Site);
    siteData.manager = manager;

    return await siteRepository.createAndSave(siteData);
  }
}

export default new SiteService();
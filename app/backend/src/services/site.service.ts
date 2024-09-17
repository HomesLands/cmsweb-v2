import { siteRepository, userRepository,  productRequisitionForm } from "@repositories";
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

    
    const form = await productRequisitionForm.findProductRequisitionForm("657084dc-7380-11ef-9b98-8c8caa41f99d");
    console.log({form})
    console.log({form: form?.requestProducts})

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

    const manager = await userRepository.findOneBy({ slug: requestData.manager });

    if (!manager) {
      throw new GlobalError(ErrorCodes.USER_ASSIGNED_NOT_FOUND);
    }

    const siteData = mapper.map(requestData, CreateSiteRequestDto, Site);
    siteData.manager = manager;

    const dataSiteCreated = await siteRepository.createAndSave(siteData);
    
    return mapper.map(dataSiteCreated, Site, SiteResponseDto);
  }
}

export default new SiteService();
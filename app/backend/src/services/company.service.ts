import { companyRepository } from "@repositories";
import { CompanyResponseDto } from "@dto/response";
import { mapper } from "@mappers";
import { Company } from "@entities";
import {
  TCreateCompanyRequestDto,
  TUpdateCompanyRequestDto,
  TUploadCompanyLogoRequestDto,
  // TUpdateCompanyRequestDto
} from "@types";
import {
  CreateCompanyRequestDto,
  UpdateCompanyRequestDto,
  // UpdateCompanyRequestDto
} from "@dto/request";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";

import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import fileService from "./file.service";

class CompanyService {
  public async getAllCompanies(): Promise<CompanyResponseDto[]> {
    const companiesData = await companyRepository.find({
      relations: ["sites"],
    });

    const companiesDto: CompanyResponseDto[] = mapper.mapArray(
      companiesData,
      Company,
      CompanyResponseDto
    );

    return companiesDto;
  }

  public async createCompany(
    plainData: TCreateCompanyRequestDto
  ): Promise<CompanyResponseDto> {
    const requestData = plainToClass(CreateCompanyRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const nameExist = await companyRepository.existsBy({
      name: requestData.name,
    });
    if (nameExist) throw new GlobalError(ErrorCodes.COMPANY_NAME_EXIST);

    const companyData = mapper.map(
      requestData,
      CreateCompanyRequestDto,
      Company
    );
    const createdCompanyData =
      await companyRepository.createAndSave(companyData);

    const companyDto = mapper.map(
      createdCompanyData,
      Company,
      CompanyResponseDto
    );
    return companyDto;
  }

  public async updateCompany(
    plainData: TUpdateCompanyRequestDto
  ): Promise<CompanyResponseDto> {
    const requestData = plainToClass(UpdateCompanyRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const company = await companyRepository.findOneBy({
      slug: requestData.slug,
    });
    if (!company) throw new GlobalError(ErrorCodes.COMPANY_NOT_FOUND);

    Object.assign(company, { name: requestData.name });
    const updatedCompany = await companyRepository.save(company);

    const companyDto = mapper.map(updatedCompany, Company, CompanyResponseDto);
    return companyDto;
  }

  public async uploadCompanyLogo(
    requestData: TUploadCompanyLogoRequestDto
  ): Promise<CompanyResponseDto> {
    const company = await companyRepository.findOneBy({
      slug: requestData.slug,
    });
    if (!company) throw new GlobalError(ErrorCodes.COMPANY_NOT_FOUND);

    const file = await fileService.uploadFile(requestData.file);

    const oldFile = company.logo;
    if (oldFile) await fileService.removeFileByName(oldFile);

    Object.assign(company, { logo: `${file.name}.${file.extension}` });
    const updatedCompany = await companyRepository.save(company);

    const companyDto = mapper.map(updatedCompany, Company, CompanyResponseDto);
    return companyDto;
  }

  public async deleteCompany(slug: string): Promise<number> {
    const company = await companyRepository.findOneBy({
      slug,
    });
    if (!company) throw new GlobalError(ErrorCodes.COMPANY_NOT_FOUND);

    const deleted = await companyRepository.softDelete({ slug });
    return deleted.affected || 0;
  }
}

export default new CompanyService();

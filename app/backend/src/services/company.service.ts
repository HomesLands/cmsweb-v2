import { companyRepository, userRepository } from "@repositories";
import { CompanyResponseDto } from "@dto/response";
import { mapper } from "@mappers";
import { Company } from "@entities";
import { TCreateCompanyRequestDto } from "@types";
import { CreateCompanyRequestDto } from "@dto/request";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";

import { validate } from "class-validator";
import { plainToClass } from "class-transformer";


class CompanyService {
  public async getAllCompanies(): Promise<CompanyResponseDto[]> {
    const companiesData = await companyRepository.find({
      relations: ['director']
    });

    const companiesDto: CompanyResponseDto[] = mapper.mapArray(
      companiesData,
      Company,
      CompanyResponseDto,
    );

    return companiesDto;
  }

  public async createCompany(plainData: TCreateCompanyRequestDto): Promise<CompanyResponseDto>{
    const requestData = plainToClass(CreateCompanyRequestDto, plainData);

    const errors = await validate(requestData);
    if(errors.length > 0) throw new ValidationError(errors);

    const nameExist = await companyRepository.existsBy({
      name: requestData.name
    });
    if(nameExist) throw new GlobalError(ErrorCodes.COMPANY_NAME_EXIST);

    const director = await userRepository.findOneBy({ slug: requestData.director });

    if(!director) throw new GlobalError(ErrorCodes.COMPANY_DIRECTOR_NOT_FOUND);

    const companyData = mapper.map(requestData, CreateCompanyRequestDto, Company);
    companyData.director = director;
    const createdCompanyData = await companyRepository.createAndSave(companyData);

    const companyDto = mapper.map(createdCompanyData, Company, CompanyResponseDto);
    return companyDto;
  }
}

export default new CompanyService();
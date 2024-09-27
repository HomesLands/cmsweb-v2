import { companyRepository, userRepository } from "@repositories";
import { CompanyResponseDto } from "@dto/response";
import { mapper } from "@mappers";
import { Company } from "@entities";
import { 
  TCreateCompanyRequestDto,
  // TUpdateCompanyRequestDto 
} from "@types";
import { 
  CreateCompanyRequestDto, 
  // UpdateCompanyRequestDto 
} from "@dto/request";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";

import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

class CompanyService {
  public async getAllCompanies(): Promise<CompanyResponseDto[]> {
    const companiesData = await companyRepository.find({
      relations: ['sites']
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

    const companyData = mapper.map(requestData, CreateCompanyRequestDto, Company);
    const createdCompanyData = await companyRepository.createAndSave(companyData);

    const companyDto = mapper.map(
      createdCompanyData,
      Company,
      CompanyResponseDto
    );
    return companyDto;
  }

  // public async updateCompany(
  //   slug: string,
  //   plainData: TUpdateCompanyRequestDto
  // ): Promise<CompanyResponseDto> {
  //   const requestData = plainToClass(UpdateCompanyRequestDto, plainData);

  //   const errors = await validate(requestData);
  //   if (errors.length > 0) throw new ValidationError(errors);

  //   // const nameExist = await companyRepository.existsBy({
  //   //   name: requestData.name,
  //   // });
  //   // if (nameExist) throw new GlobalError(ErrorCodes.COMPANY_NAME_EXIST);

  //   const company = await companyRepository.findOneBy({ slug });
  //   if (!company) throw new GlobalError(ErrorCodes.COMPANY_NOT_FOUND);

  //   const director = await userRepository.findOneBy({
  //     slug: requestData.director,
  //   });
  //   if (!director) throw new GlobalError(ErrorCodes.COMPANY_DIRECTOR_NOT_FOUND);

  //   Object.assign(company, { name: requestData.name, director });
  //   const updatedCompany = await companyRepository.save(company);

  //   const companyDto = mapper.map(updatedCompany, Company, CompanyResponseDto);
  //   return companyDto;
  // }
}

export default new CompanyService();

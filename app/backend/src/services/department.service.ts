import { siteRepository, departmentRepository } from "@repositories";
import { mapper } from "@mappers";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { Department } from "@entities";
import { DepartmentResponseDto } from "@dto/response";
import { CreateDepartmentRequestDto } from "@dto/request";
import { TCreateDepartmentRequestDto } from "@types";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";


class DepartmentService {
  public async getAllDepartments(): Promise<DepartmentResponseDto[] | []> {
    const departmentsData = await departmentRepository.find({
      relations: [
        'userDepartments',
        'site',
      ]
    });

    const departmentDto: DepartmentResponseDto[] = mapper.mapArray(
      departmentsData,
      Department,
      DepartmentResponseDto
    );
    return departmentDto;
  }

  public async createDepartment(
    plainData: TCreateDepartmentRequestDto
  ): Promise<DepartmentResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(CreateDepartmentRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const site = await siteRepository.findOneBy({ slug: requestData.site });
    if(!site) throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);

    const departmentData = mapper.map(requestData, CreateDepartmentRequestDto, Department);
    departmentData.site = site;

    const dataDepartmentCreated = await departmentRepository.createAndSave(departmentData);
    
    return mapper.map(dataDepartmentCreated, Department, DepartmentResponseDto);
  }
}

export default new DepartmentService();
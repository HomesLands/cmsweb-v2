import { siteRepository, departmentRepository } from "@repositories";
import { mapper } from "@mappers";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { Department } from "@entities";
import { DepartmentResponseDto } from "@dto/response";
import {
  CreateDepartmentRequestDto,
  UpdateDepartmentRequestDto,
} from "@dto/request";
import { TCreateDepartmentRequestDto } from "@types";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";

class DepartmentService {
  public async getAllDepartments(): Promise<DepartmentResponseDto[] | []> {
    const departmentsData = await departmentRepository.find({
      relations: ["userDepartments", "site"],
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
    if (!site) throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);

    const departmentData = mapper.map(
      requestData,
      CreateDepartmentRequestDto,
      Department
    );
    departmentData.site = site;

    const isExistNameNormalize = await departmentRepository.findOne({
      where: { nameNormalize: departmentData.nameNormalize },
    });

    if (isExistNameNormalize)
      throw new GlobalError(ErrorCodes.NAME_NORMALIZE_EXIST);

    const dataDepartmentCreated =
      await departmentRepository.createAndSave(departmentData);

    return mapper.map(dataDepartmentCreated, Department, DepartmentResponseDto);
  }

  public async deleteDepartment(slug: string): Promise<number> {
    const department = await departmentRepository.findOneBy({
      slug,
    });
    if (!department) throw new GlobalError(ErrorCodes.DEPARTMENT_NOT_FOUND);

    const deleted = await departmentRepository.softDelete({ slug });
    return deleted.affected || 0;
  }

  public async updateDepartment(
    plainData: UpdateDepartmentRequestDto
  ): Promise<DepartmentResponseDto> {
    const requestData = plainToClass(UpdateDepartmentRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const department = await departmentRepository.findOneBy({
      slug: requestData.slug,
    });
    if (!department) throw new GlobalError(ErrorCodes.DEPARTMENT_NOT_FOUND);

    const site = siteRepository.findOne({
      where: { slug: requestData.site },
    });
    if (!site) throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);

    // Map request to normal request
    const updateDeaprtmentRequest = mapper.map(
      requestData,
      UpdateDepartmentRequestDto,
      UpdateDepartmentRequestDto
    );
    // Check if nameNormalize is changed
    if (updateDeaprtmentRequest.nameNormalize !== department.nameNormalize) {
      const isExistNameNormalize = await departmentRepository.findOne({
        where: { nameNormalize: updateDeaprtmentRequest.nameNormalize },
      });
      if (isExistNameNormalize)
        throw new GlobalError(ErrorCodes.NAME_NORMALIZE_EXIST);
    }

    Object.assign(department, { ...updateDeaprtmentRequest, site });
    const updated = await departmentRepository.save(department);

    return mapper.map(updated, Department, DepartmentResponseDto);
  }
}

export default new DepartmentService();

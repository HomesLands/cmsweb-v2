import { mapper } from "@mappers";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { UserDepartment } from "@entities";
import {
  userDepartmentRepository,
  userRepository,
  departmentRepository,
} from "@repositories";
import { UserDepartmentResponseDto } from "@dto/response";
import {
  CreateUserDepartmentRequestDto,
  UpdateUserDepartmentRequestDto,
} from "@dto/request";
import {
  TCreateUserDepartmentRequestDto,
  TUpdateUserDepartmentRequestDto,
} from "@types";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";

class UserDepartmentService {
  public async getAllUserDepartments(): Promise<
    UserDepartmentResponseDto[] | []
  > {
    const userDepartmentsData = await userDepartmentRepository.find({
      relations: ["department", "user"],
    });

    const userDepartmentsDto: UserDepartmentResponseDto[] = mapper.mapArray(
      userDepartmentsData,
      UserDepartment,
      UserDepartmentResponseDto
    );
    return userDepartmentsDto;
  }

  public async createUserDepartment(
    plainData: TCreateUserDepartmentRequestDto
  ): Promise<UserDepartmentResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(CreateUserDepartmentRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const user = await userRepository.findOneBy({ slug: requestData.user });
    const department = await departmentRepository.findOneBy({
      slug: requestData.department,
    });

    if (!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);
    if (!department) throw new GlobalError(ErrorCodes.DEPARTMENT_NOT_FOUND);

    const isExisted = await userDepartmentRepository.exists({
      where: {
        user: { id: user.id },
        department: { id: department.id },
      },
    });
    if (isExisted) throw new GlobalError(ErrorCodes.USER_DEPARTMENT_EXIST);

    const userDepartmentData = mapper.map(
      requestData,
      CreateUserDepartmentRequestDto,
      UserDepartment
    );
    userDepartmentData.user = user;
    userDepartmentData.department = department;

    const dataUserDepartmentCreated =
      await userDepartmentRepository.createAndSave(userDepartmentData);

    return mapper.map(
      dataUserDepartmentCreated,
      UserDepartment,
      UserDepartmentResponseDto
    );
  }

  public async changeDepartment(plainData: TUpdateUserDepartmentRequestDto) {
    const requestData = plainToClass(UpdateUserDepartmentRequestDto, plainData);
    const validator = await validate(requestData);
    if (validator.length > 0) throw new ValidationError(validator);

    const userDepartment = await userDepartmentRepository.findOne({
      where: { slug: requestData.slug },
    });
    if (!userDepartment)
      throw new GlobalError(ErrorCodes.USER_DEPARTMENT_NOT_FOUND);

    const department = await departmentRepository.findOne({
      where: {
        slug: requestData.department,
      },
    });

    if (!department) throw new GlobalError(ErrorCodes.DEPARTMENT_NOT_FOUND);

    // Update department
    Object.assign(userDepartment, { department });
    const updatedUserDepartment =
      await userDepartmentRepository.save(userDepartment);

    return mapper.map(
      updatedUserDepartment,
      UserDepartment,
      UserDepartmentResponseDto
    );
  }

  public async deleteUserDepartment(slug: string): Promise<number> {
    const userDepartment = await userDepartmentRepository.findOne({
      where: { slug },
    });
    if (!userDepartment)
      throw new GlobalError(ErrorCodes.USER_DEPARTMENT_NOT_FOUND);

    const deleted = await userDepartmentRepository.softDelete({ slug });
    console.log({ deleted });
    return 1;
  }
}

export default new UserDepartmentService();

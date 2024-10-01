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
import { CreateUserDepartmentRequestDto } from "@dto/request";
import { TCreateUserDepartmentRequestDto } from "@types";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";

class UserDepartmentService {
  public async getAllUserDepartments(): Promise<UserDepartmentResponseDto[] | []> {
    const userDepartmentsData = await userDepartmentRepository.find({
      relations: [
        'department',
        'user',
      ]
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
    if(!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);

    const department = await departmentRepository.findOneBy({ slug: requestData.department });
    if(!department) throw new GlobalError(ErrorCodes.DEPARTMENT_NOT_FOUND);

    const userDepartmentData = mapper.map(requestData, CreateUserDepartmentRequestDto, UserDepartment);
    userDepartmentData.user = user;
    userDepartmentData.department = department;

    const dataUserDepartmentCreated = await userDepartmentRepository.createAndSave(userDepartmentData);
    
    return mapper.map(dataUserDepartmentCreated, UserDepartment, UserDepartmentResponseDto);
  }
}

export default new UserDepartmentService();